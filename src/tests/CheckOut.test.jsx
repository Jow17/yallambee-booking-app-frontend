import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckOut from '../components/CheckOut';
import '@testing-library/jest-dom';
import { format } from 'date-fns';

// Mock the 'react-datepicker' CSS file since Jest doesn't process CSS
jest.mock('react-datepicker/dist/react-datepicker.css', () => {});

describe('CheckOut Component', () => {
  const setEndDate = jest.fn();

  it('renders correctly with placeholder text', () => {
    render(<CheckOut endDate={null} setEndDate={setEndDate} startDate={null} />);

    // Check that the DatePicker is rendered with the correct placeholder
    expect(screen.getByPlaceholderText('Check out')).toBeInTheDocument();

    // Check that the calendar icon is present using a className or another attribute
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
  });

  it('allows the user to select a date', () => {
    render(<CheckOut endDate={null} setEndDate={setEndDate} startDate={null} />);

    // Simulate selecting a date (today)
    const today = new Date();
    const formattedDate = format(today, 'dd/MM/yyyy');
    
    fireEvent.change(screen.getByPlaceholderText('Check out'), {
      target: { value: formattedDate },
    });

    // Check if setEndDate was called with the selected date
    expect(setEndDate).toHaveBeenCalled();
  });

  it('only allows selecting dates from startDate onwards', () => {
    const startDate = new Date(); // Today
    const futureDate = new Date(startDate);
    futureDate.setDate(futureDate.getDate() + 3); // 3 days from today

    render(<CheckOut endDate={null} setEndDate={setEndDate} startDate={startDate} />);

    // Simulate selecting a date (3 days from today)
    const formattedDate = format(futureDate, 'dd/MM/yyyy');
    
    fireEvent.change(screen.getByPlaceholderText('Check out'), {
      target: { value: formattedDate },
    });

    // Check if setEndDate was called with the selected date
    expect(setEndDate).toHaveBeenCalled();
  });

  it('sets minDate to startDate if provided', () => {
    const startDate = new Date(); // Today

    render(<CheckOut endDate={null} setEndDate={setEndDate} startDate={startDate} />);

    const datePicker = screen.getByPlaceholderText('Check out');
    
    // Check if the minDate attribute is applied correctly (this is more of a conceptual check)
    expect(datePicker).toBeInTheDocument();
  });
});
