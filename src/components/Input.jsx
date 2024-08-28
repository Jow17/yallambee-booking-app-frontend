import React, { forwardRef } from "react";

const Input = forwardRef(({ type, placeholder, label, id, required, containerClassName, ...props }, ref) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref} // Attach the ref here
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-green-500 block w-full p-2.5"
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </div>
  );
});

// Set display name for easier debugging and to satisfy ESLint
Input.displayName = "Input";

export default Input;
