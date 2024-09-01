import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendar } from 'react-icons/bs';
import '../styles/datepicker.css';

const CheckOut = ({ endDate, setEndDate, startDate }) => {
  return (
    <div className='w-full h-full bg-white relative'>
      <div className='absolute right-8 top-1/2 transform -translate-y-1/2'>
        <div>
          <BsCalendar className='text-accent text-base' data-testid="calendar-icon" />
        </div>
      </div>
      <DatePicker
        className='w-full h-full'
        selected={endDate}
        placeholderText='Check out'
        onChange={(date) => setEndDate(date)}
        minDate={startDate || new Date()}
        dateFormat='dd/MM/yyyy' 
      />
    </div>
  );
};

export default CheckOut;
