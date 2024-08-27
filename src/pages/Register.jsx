import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Register = () => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { setUser } = React.useContext(UserContext);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/users', data);
      const { user } = response.data;

      // Destructure and use the user data from the registration response
      const { _id, isAdmin, ...userData } = user;

      console.log('User created successfully!', user);

      // Update the user context with the logged-in user’s data
      setUser({ id: _id, ...userData, isAdmin });

      // Navigate to the appropriate page based on user role
      if (isAdmin) {
        window.alert('Admin user created successfully!');
        navigate('/admin-dashboard');
      } else {
        window.alert('User created successfully!');
        navigate(`/profile/${_id}`);
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      window.alert('Invalid email or password! Please try again.');
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
        Username
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("username", { required: "This field is required", minLength: 3 })}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </label>
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
          type="tel"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("phone", {
            required: "This field is required",
            pattern: {
              value: /^\d{10,15}$/,
              message: "Please provide a valid phone number (10-15 digits)",
            },
          })}
        />
        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Date of Birth
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
}

export default Register;