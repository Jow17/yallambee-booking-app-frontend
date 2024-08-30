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
      saveToken(token); // Save the token to local storage
  
      // Extract user ID from the token
      const _id = await extractUserIdFromToken(token); // Use `_id` instead of `userId`
      console.log('Extracted User ID:', _id);
      
      if (!_id) {
        throw new Error('User ID not found in token');
      }
  
      // Fetch user details using the user ID
      const userResponse = await axios.get(`https://yallambee-booking-app-backend.onrender.com/users/${_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Fetched user data:', userResponse.data);
      
      const { isAdmin, ...userData } = userResponse.data;
  
      // Update the user context with the logged-in user’s data
      setUser({ _id, ...userData, isAdmin });
  
      // Redirect to appropriate dashboard or profile page
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
    <>
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
    </>
  );
};

export default SignInForm;