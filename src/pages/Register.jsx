import React from 'react'
import { useForm } from 'react-hook-form'

const Register = () => {
  const { register, watch, handleSubmit, formState: { errors }} = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <>
     <form className="flex flex-col gap-5" onSubmit={onSubmit}>
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
          <label className="text-gray-700 text-sm font-bold flex-1">
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
        <span>
          <button
            type="submit"
            className="bg-green-600 text-white p-2 font-bold hover:bg-green-500 text-xl"
          >
            Create Account
          </button>
        </span>
      </form>
    </>
  );
};

export default Register;