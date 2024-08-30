import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { saveToken } from './authUtils';
import { UserContext } from '../context/userContext';
import Button from '../components/Button';
import Input from '../components/Input';

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
          navigate(`/profile/${user._id}`);
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
    <div>
      <form className="space-y-4 max-w-sm mx-auto md:mt-16 bg-gray-100 rounded-lg p-8 shadow-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-xl font-bold mb-4">Register</div>

        <Input
          type="text"
          label="First Name"
          id="firstname"
          {...register("firstName", { required: "This field is required" })}
          placeholder="First Name"
        />
        {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}

        <Input
          type="text"
          label="Last Name"
          id="lastname"
          {...register("lastName", { required: "This field is required" })}
          placeholder="Last Name"
        />
        {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}

        <Input
          type="text"
          label="Username"
          id="username"
          {...register("username", { required: "This field is required", minLength: 3 })}
          placeholder="Username"
        />
        {errors.username && <span className="text-red-500">{errors.username.message}</span>}

        <Input
          type="email"
          label="Email"
          id="email"
          {...register("email", { required: "This field is required" })}
          placeholder="Email"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}

        <Input
          type="tel"
          label="Phone Number"
          id="phone"
          {...register("phone", {
            required: "This field is required",
            pattern: {
              value: /^\d{10,15}$/,
              message: "Please provide a valid phone number (10-15 digits)",
            },
          })}
          placeholder="Phone Number"
        />
        {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}

        <Input
          type="text"
          label="Address"
          id="address"
          {...register("address")}
          placeholder="Address"
        />

        <Input
          type="date"
          label="Date of Birth"
          id="dob"
          {...register("dob", { required: "This field is required" })}
          placeholder="Date of Birth"
        />
        {errors.dob && <span className="text-red-500">{errors.dob.message}</span>}

        <Input
          type="password"
          label="Password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Password"
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}

        <Input
          type="password"
          label="Confirm Password"
          id="password2"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match!";
              }
            },
          })}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}

        <div className="flex justify-end">
          <Button type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
