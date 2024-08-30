import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { saveToken, extractUserIdFromToken } from "./authUtils";
import { UserContext } from "../context/userContext";
import Button from "../components/Button";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";

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
    
      // Extract user ID from token
      const userId = await extractUserIdFromToken(token);
      
      if (!userId) {
        throw new Error('User ID not found in token');
      }
    
      console.log('User ID:', userId);
      
      // Fetch user data using the user ID
      const userResponse = await axios.get(`https://yallambee-booking-app-backend.onrender.com/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Fetched user data:', userResponse.data);
      
      // Extract relevant data
      const { _id, isAdmin, ...userData } = userResponse.data;
      
      // Update user context with the fetched data
      setUser({ id: _id, ...userData, isAdmin });
    
      // Redirect based on user role
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
    <div>
      <form className="space-y-4 max-w-sm mx-auto mt-20 md:mt-56 bg-gray-100 rounded-lg p-8 shadow-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-xl font-bold mb-4">Sign In</div>
        <Input 
          type="email" 
          label="Email" 
          id="email" 
          {...register("email", { required: "This field is required" })} 
          error={errors.email?.message}
        />
        <Input 
          type="password" 
          label="Password" 
          id="password" 
          {...register("password", { 
            required: "This field is required", 
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })} 
          error={errors.password?.message}
        />
        <Checkbox label="Remember me" id="remember" />
        <div className="flex justify-between items-center">
          <span className="text-sm">
            Don't have an account?{" "}
            <Link className="underline" to="/register">
              Create an account here
            </Link>
          </span>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;