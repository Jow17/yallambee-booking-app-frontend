import React from "react";

const Checkbox = ({ label, id, containerClassName, ...props }) => {
  return (
    <div className={"flex items-start " + containerClassName}>
      <div className="flex items-center h-5">
        <input
          id={id}
          type="checkbox"
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
          {...props}
        />
      </div>
      <label for={id} className="ms-2 text-sm font-medium text-gray-900 ">
        Remember me
      </label>
    </div>
  );
};

export default Checkbox;
