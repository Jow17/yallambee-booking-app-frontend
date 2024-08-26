import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveToken, extractUserIdFromToken } from './authUtils';

const Register = () => {
  const { register, watch, handleSubmit, formState: { errors }} = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Step 1: Register the user
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/users', data);
      const { token } = response.data;
  
      if (!token) {
        throw new Error('Token not received from server');
      }
  
      console.log('Registration successful, token:', token);
      saveToken(token); // Save the token to local storage
  
      // Step 2: Extract user ID from the token
      const userId = extractUserIdFromToken(token); // Changed to sync function
  
      if (!userId) {
        throw new Error('User ID not found in token');
      }
  
      console.log('Extracted User ID:', userId);
  
      // Step 3: Fetch user details (optional, for additional verification)
      const userResponse = await axios.get(`https://yallambee-booking-app-backend.onrender.com/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const { _id, isAdmin } = userResponse.data;
  
      console.log('Fetched user data:', userResponse.data);
  
      // Step 4: Redirect based on user role
      if (isAdmin) {
        navigate('/admin-dashboard');
      } else {
        navigate(`/profile/${_id}`);
        console.log(`Navigating to /profile/${_id}`);
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Phone Number
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("phone", { required: "This field is required" })}
        />
        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        DOB
        <input
          type="date"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("dob", { required: "This field is required" })}
        />
        {errors.dob && (
          <span className="text-red-500">{errors.dob.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match!";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <button
        type="submit"
        className="bg-green-600 text-white p-2 font-bold hover:bg-green-500 text-xl"
      >
        Create Account
      </button>
    </form>
  );
};

export default Register;