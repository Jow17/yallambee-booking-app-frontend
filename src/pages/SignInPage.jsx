import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { saveToken, extractUserIdFromToken, verifyToken } from "./authUtils";

const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Sends post request to the server and retrieves the token
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/login', data);
      const { token } = response.data;

      if (!token) {
        throw new Error('Token not received from server');
      }

      console.log('Login successful, token:', token);
      saveToken(token); // Save the token to local storage

      // Verify and log token contents
      await verifyToken(token); // Log decoded token for debugging

      // Extract user ID from token
      const userId = await extractUserIdFromToken(token); // Note the use of `await`

      console.log('Extracted userId:', userId); // Log userId for debugging

      if (!userId) {
        throw new Error('User ID not found in token');
      }

      // Fetch user details using the user ID
      const userResponse = await axios.get(`https://yallambee-booking-app-backend.onrender.com/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const { _id, isAdmin } = userResponse.data;

      console.log('Fetched user data:', userResponse.data); // Log user data for debugging

      if (isAdmin) {
        navigate('/admin-dashboard');
      } else {
        navigate(`/profile/${_id}`);
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      
      <label className="text-gray-700 text-sm font-bold flex-1">
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
      
      <label className="text-gray-700 text-sm font-bold flex-1">
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

      <div className="flex items-center justify-between">
        <span className="text-sm">
          Don't have an account?{" "}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-green-800 text-white p-2 font-bold hover:bg-green-500 text-xl"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default SignInForm;