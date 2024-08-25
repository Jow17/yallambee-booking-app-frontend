import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();  // To programmatically navigate

  const onSubmit = async (data) => {
    try {
      // Replace with your API endpoint
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/login/id', data);

      // Assuming the response includes the user's ID
      const userId = response.data.user._id;

      // Handle successful login (e.g., store token, redirect user)
      console.log('Login successful:', response.data);

      // Redirect to the user's profile page
      navigate(`/profile/${userId}`);
    } catch (error) {
      // Handle login error (e.g., show error message)
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Sign In</h2>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Username
        <input
          type="username"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("username", { required: "This field is required" })}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
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