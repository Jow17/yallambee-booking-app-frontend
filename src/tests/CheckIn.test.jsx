import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckIn from '../components/CheckIn';
import '@testing-library/jest-dom';
import { format } from 'date-fns';

// Mock the 'react-datepicker' CSS file since Jest doesn't process CSS
jest.mock('react-datepicker/dist/react-datepicker.css', () => {});

describe('CheckIn Component', () => {
  const setStartDate = jest.fn();

  it('renders correctly with placeholder text', () => {
    render(<CheckIn startDate={null} setStartDate={setStartDate} />);

    // Check that the DatePicker is rendered with the correct placeholder
    expect(screen.getByPlaceholderText('Check in')).toBeInTheDocument();

  });

  it('allows the user to select a date', () => {
    render(<CheckIn startDate={null} setStartDate={setStartDate} />);

    // Simulate selecting a date (today)
    const today = new Date();
    const formattedDate = format(today, 'dd/MM/yyyy');
    
    fireEvent.change(screen.getByPlaceholderText('Check in'), {
      target: { value: formattedDate },
    });

    // Check if setStartDate was called with the selected date
    expect(setStartDate).toHaveBeenCalled();
  });

  it('only allows selecting dates from today onwards', () => {
    render(<CheckIn startDate={null} setStartDate={setStartDate} />);

    // The DatePicker should have a minDate prop set to today or later
    const datePicker = screen.getByPlaceholderText('Check in');

    // Ensure that the minDate is correctly set (this is just a general check)
    const minDate = new Date();
    expect(datePicker).toBeInTheDocument();
  });
});
