import React from "react";
import PropTypes from "prop-types";

const Select = ({
  options,
  label,
  id,
  containerClassName,
  required,
  value,
  ...props
}) => {
  return (
    <div className={containerClassName}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        id={id}
        required={required}
        value={value || ""} // Ensure the value is controlled
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...props}
      >
        {/* Default option */}
        <option value="" disabled>
          Select a property
        </option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

// Add PropTypes validation
Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  containerClassName: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired, // or PropTypes.oneOfType([PropTypes.string, PropTypes.number]) if you expect both types
  onChange: PropTypes.func.isRequired
};

// Default props (optional)
Select.defaultProps = {
  containerClassName: "",
  required: false,
};

export default Select;
