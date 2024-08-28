import React from "react";

const Input = ({
  type,
  placeholder,
  label,
  id,
  required,
  containerClassName,
  ...props
}) => {
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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500   focus:border-green-500 focus:outline-green-500  block w-full p-2.5 "
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </div>
  );
};

export default Input;
