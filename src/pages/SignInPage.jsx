import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { saveToken, extractUserIdFromToken } from "./authUtils";
import { UserContext } from "../context/userContext";
import { BsArrowRight } from 'react-icons/bs';

const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const onSubmit = async (data) => {
    console.log('Form submitted');
    
    try {
      // Perform login request
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/login', data);
      console.log('Response received:', response);
      
      const { token } = response.data;
      
      if (!token) {
        throw new Error('Token not received from server');
      }
      
      console.log('Login successful, token:', token);
      saveToken(token);
  
      const _id = await extractUserIdFromToken(token);
      console.log('Extracted User ID:', _id);
      
      if (!_id) {
        throw new Error('User ID not found in token');
      }
  
      const userResponse = await axios.get(`https://yallambee-booking-app-backend.onrender.com/users/${_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Fetched user data:', userResponse.data);
      
      const { isAdmin, ...userData } = userResponse.data;
  
      setUser({ _id, ...userData, isAdmin });
  
      if (isAdmin) {
        navigate('/admin-dashboard');
      } else {
        navigate(`/profile/${_id}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
      window.alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-white shadow-2xl min-h-[500px] group max-w-sm mx-auto mt-20 rounded-lg'>
        <form className="space-y-4 p-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center mb-6">
            <h3 className='h3'>Sign In</h3>
            <p className='max-w-[300px] mx-auto'>
              Please enter your details to sign in to your account.
            </p>
          </div>
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
          <div className="flex flex-col items-center mt-4 space-y-4">
            <span className="text-sm text-center">
              Don't have an account?{" "}
              <Link className="underline text-accent" to="/register">
                Create an account here
              </Link>
            </span>
            <button
              type='submit'
              className='btn btn-secondary btn-lg w-full flex justify-center items-center gap-x-2'
            >
              Login <BsArrowRight className='text-lg' />
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignInForm;