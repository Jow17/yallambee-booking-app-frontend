import React from "react";

const Modal = ({ onClose, children }) => {
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="bg-gray-800/50 overflow-y-auto overflow-x-hidden fixed inset-0 z-[999] flex justify-center items-center"
    >
      <div className="relative w-full max-w-2xl p-4 h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow-lg">
          {/* <!-- Modal body --> */}
          <div className="p-6 space-y-6">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
