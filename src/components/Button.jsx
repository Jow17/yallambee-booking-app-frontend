import React from "react"

const Button = ({ children, onClick, type = "button", variant = "primary" }) => {
  const primary =
    "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"

  const danger =
    "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"

  const buttonClass = variant === "primary" ? primary : variant === "danger" ? danger : ""

  return (
    <button
      onClick={onClick}
      type={type} // Use the passed type prop
      className={buttonClass}
    >
      {children}
    </button>
  )
}

export default Button