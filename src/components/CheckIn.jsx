import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { BsCalendar } from "react-icons/bs"
import "../styles/datepicker.css"

const CheckIn = ({ startDate, setStartDate }) => {
  return (
    <div className="w-full h-full bg-white relative">
      {/* icon */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
        <div>
          <BsCalendar className="text-accent text-base" />
        </div>
      </div>
      <DatePicker
        className="w-full h-full"
        selected={startDate}
        placeholderText="Check in"
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
        dateFormat="dd/MM/yyyy" 
      />
    </div>
  )
}

export default CheckIn