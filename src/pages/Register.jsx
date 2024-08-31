import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { BsArrowRight } from 'react-icons/bs';
import { saveToken } from './authUtils';

const Register = () => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/users', data);
      if (response.status === 201) {
        console.log('User created successfully:', response.data);
      
        const { token, user } = response.data;

        // Save the token
        saveToken(token);

        // Update the user context with the new user’s data
        setUser({ id: user._id, ...user, isAdmin: user.isAdmin });

        // Redirect based on user role
        if (user.isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          console.error('Validation error:', err.msg);
        });
      } else {
        console.error('Registration error:', error.response?.data || error.message);
        window.alert('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-white shadow-2xl min-h-[500px] group max-w-sm mx-auto mt-20 rounded-lg'>
        <form className="space-y-4 p-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center mb-6">
            <h3 className='h3'>Create an Account</h3>
            <p className='max-w-[300px] mx-auto'>
              Please enter your details to register a new account.
            </p>
          </div>

          {/* First Name */}
          <div className='bg-white shadow-lg max-w-[300px] mx-auto h-[60px] flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base'>
            <div className='w-full'>
              <input 
                type="text" 
                className='border-b w-full py-2 px-4 focus:outline-none focus:border-accent'
                placeholder="First Name" 
                {...register("firstName", { required: "This field is required" })} 
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
          </div>

          {/* Last Name */}
          <div className='bg-white shadow-lg max-w-[300px] mx-auto h-[60px] flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base'>
            <div className='w-full'>
              <input 
                type="text" 
                className='border-b w-full py-2 px-4 focus:outline-none focus:border-accent'
                placeholder="Last Name" 
                {...register("lastName", { required: "This field is required" })} 
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div className='bg-white shadow-lg max-w-[300px] mx-auto h-[60px] flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base'>
            <div className='w-full'>
              <input 
                type="email" 
                className='border-b w-full py-2 px-4 focus:outline-none focus:border-accent'
                placeholder="Email" 
                {...register("email", { required: "This field is required" })} 
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          </div>

          {/* Password */}
          <div className='bg-white shadow-lg max-w-[300px] mx-auto h-[60px] flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base'>
            <div className='w-full'>
              <input 
                type="password" 
                className='border-b w-full py-2 px-4 focus:outline-none focus:border-accent'
                placeholder="Password" 
                {...register("password", { 
                  required: "This field is required", 
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })} 
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
          </div>

          {/* Confirm Password */}
          <div className='bg-white shadow-lg max-w-[300px] mx-auto h-[60px] flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base'>
            <div className='w-full'>
              <input 
                type="password" 
                className='border-b w-full py-2 px-4 focus:outline-none focus:border-accent'
                placeholder="Confirm Password" 
                {...register("confirmPassword", { 
                  required: "This field is required", 
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  },
                  validate: (value) =>
                    value === watch('password') || "Passwords do not match"
                })} 
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Redirect to Sign In and Submit Button */}
          <div className="flex flex-col items-center mt-4 space-y-4">
            <span className="text-sm text-center">
              Already have an account?{" "}
              <Link className="underline text-accent" to="/SignInPage">
                Sign In here
              </Link>
            </span>
            <button
              type='submit'
              className='btn btn-secondary btn-lg w-full flex justify-center items-center gap-x-2'
            >
              Register <BsArrowRight className='text-lg' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
