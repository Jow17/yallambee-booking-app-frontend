import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UpdateBookingForm from '../components/UpdateBookingForm';
import '@testing-library/jest-dom';
import axios from 'axios';

// Mock axios to avoid real API calls during testing
jest.mock('axios');

describe('UpdateBookingForm Component', () => {
  const mockBooking = {
    _id: 'booking123',
    startDate: '2024-09-01',
    endDate: '2024-09-10',
    guests: 2,
  };

  const onEdit = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial booking details', () => {
    render(
      <UpdateBookingForm booking={mockBooking} onEdit={onEdit} onClose={onClose} />
    );

    // Check if the form fields are rendered with the correct initial values
    expect(screen.getByLabelText('Check-in').value).toBe('2024-09-01');
    expect(screen.getByLabelText('Check-out').value).toBe('2024-09-10');
    expect(screen.getByLabelText('Guests').value).toBe('2');
    expect(screen.getByText('Update')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('handles form submission and calls onEdit with updated data', async () => {
    axios.patch.mockResolvedValueOnce({
      data: { ...mockBooking, startDate: '2024-09-05', endDate: '2024-09-15' }
    });

    render(
      <UpdateBookingForm booking={mockBooking} onEdit={onEdit} onClose={onClose} />
    );

    // Change form values
    fireEvent.change(screen.getByLabelText('Check-in'), { target: { value: '2024-09-05' } });
    fireEvent.change(screen.getByLabelText('Check-out'), { target: { value: '2024-09-15' } });
    fireEvent.change(screen.getByLabelText('Guests'), { target: { value: '3' } });

    // Submit the form
    fireEvent.click(screen.getByText('Update'));

    // Wait for the axios call to resolve
    await waitFor(() => {
      expect(onEdit).toHaveBeenCalledWith({
        _id: 'booking123',
        startDate: '2024-09-05',
        endDate: '2024-09-15',
        guests: 2,
      });
      expect(onClose).toHaveBeenCalled(); // Ensure the form is closed after submission
    });
  });

  it('displays a loading state during form submission', async () => {
    axios.patch.mockResolvedValueOnce({
      data: { ...mockBooking, startDate: '2024-09-05', endDate: '2024-09-15' }
    });

    render(
      <UpdateBookingForm booking={mockBooking} onEdit={onEdit} onClose={onClose} />
    );

    // Submit the form
    fireEvent.click(screen.getByText('Update'));

    // Check if the loading state is displayed
    expect(screen.getByText('Updating...')).toBeInTheDocument();

    // Wait for the axios call to resolve
    await waitFor(() => {
      expect(onEdit).toHaveBeenCalled();
    });
  });

  it('calls onClose when the cancel button is clicked', () => {
    render(
      <UpdateBookingForm booking={mockBooking} onEdit={onEdit} onClose={onClose} />
    );

    // Click the cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Ensure the onClose callback is called
    expect(onClose).toHaveBeenCalled();
  });

  it('validates the form fields correctly', () => {
    render(
      <UpdateBookingForm booking={mockBooking} onEdit={onEdit} onClose={onClose} />
    );

    // Try to submit the form with an invalid guests number
    fireEvent.change(screen.getByLabelText('Guests'), { target: { value: '0' } });
    fireEvent.click(screen.getByText('Update'));

    // Ensure the form doesn't submit with invalid data (onEdit shouldn't be called)
    expect(onEdit).not.toHaveBeenCalled();
  });
});
