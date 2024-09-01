import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingCard from '../components/BookingCard';
import '@testing-library/jest-dom';
import axios from 'axios';

// Mocking axios to avoid real API calls during testing
jest.mock('axios');

// Mock the UpdateBookingForm component
jest.mock('../components/UpdateBookingForm', () => () => <div>Edit Booking Form</div>);

describe('BookingCard Component', () => {
  const mockBooking = {
    _id: 'booking123',
    property: { _id: 'property123' },
    startDate: '2024-09-01',
    endDate: '2024-09-10',
    totalPrice: 1000
  };

  const mockProperty = {
    _id: 'property123',
    name: 'Test Property',
    description: 'A lovely place to stay.',
    size: 50,
    maxPerson: 4,
    images: ['image1.jpg']
  };

  const onDelete = jest.fn();
  const onEdit = jest.fn();

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockProperty });
  });

  it('renders correctly with booking and property details', async () => {
    render(<BookingCard booking={mockBooking} type="admin" onDelete={onDelete} onEdit={onEdit} />);

    // Check if loading state is displayed initially
    expect(screen.getByText('Loading booking details...')).toBeInTheDocument();

    // Wait for property details to load
    await waitFor(() => {
      expect(screen.getByText('Test Property')).toBeInTheDocument();
    });

    // Check if booking dates and price are displayed
    expect(screen.getByText('Dates: 9/1/2024 - 9/10/2024')).toBeInTheDocument();
    expect(screen.getByText('Price: $1000')).toBeInTheDocument();
  });

  it('displays an error message if fetching property details fails', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching property'));

    render(<BookingCard booking={mockBooking} type="admin" onDelete={onDelete} onEdit={onEdit} />);

    // Wait for error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Error fetching property details. Please try again.')).toBeInTheDocument();
    });
  });

  it('opens and closes the edit modal correctly', async () => {
    render(<BookingCard booking={mockBooking} type="admin" onDelete={onDelete} onEdit={onEdit} />);

    // Wait for property details to load
    await waitFor(() => {
      expect(screen.getByText('Test Property')).toBeInTheDocument();
    });

    // Click the update button to open the modal
    fireEvent.click(screen.getByText('Update'));

    // Check if the modal is displayed with the mock content
    expect(screen.getByText('Edit Booking Form')).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByLabelText('Close modal'));

    // Check if the modal is closed
    expect(screen.queryByText('Edit Booking Form')).not.toBeInTheDocument();
  });

  it('calls onDelete with the correct booking ID when delete button is clicked', async () => {
    render(<BookingCard booking={mockBooking} type="admin" onDelete={onDelete} onEdit={onEdit} />);

    // Wait for property details to load
    await waitFor(() => {
      expect(screen.getByText('Test Property')).toBeInTheDocument();
    });

    // Click the delete button
    fireEvent.click(screen.getByText('Cancel'));

    // Check if onDelete was called with the correct booking ID
    expect(onDelete).toHaveBeenCalledWith('booking123');
  });
});
