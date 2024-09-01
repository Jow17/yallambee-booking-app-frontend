import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UpdateUserDetailsForm from '../components/UpdateUserDetailsForm';
import '@testing-library/jest-dom';
// import axios from 'axios';

// Mock axios to avoid real API calls during testing
jest.mock('axios');

describe('UpdateUserDetailsForm Component', () => {
  const mockUser = {
    _id: '66d2f520c0b469ee5bc0ee11',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password',
    email: 'john.doe@example.com',
    phone: '6666666666',
    address: '123 Main St',
    dob: '1990-01-01',
  };

  const onEdit = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial user details', () => {
    render(
      <UpdateUserDetailsForm user={mockUser} onEdit={onEdit} onClose={onClose} />
    );

    // Check if the form fields are rendered with the correct initial values
    expect(screen.getByLabelText('First Name').value).toBe(mockUser.firstName);
    expect(screen.getByLabelText('Last Name').value).toBe(mockUser.lastName);
    expect(screen.getByLabelText('Email').value).toBe(mockUser.email);
    expect(screen.getByLabelText('Phone Number').value).toBe(mockUser.phone);
    expect(screen.getByLabelText('Address').value).toBe(mockUser.address);
    expect(screen.getByLabelText('Date of Birth').value).toBe(mockUser.dob);
  });

  it('calls onClose when the cancel button is clicked', () => {
    render(
      <UpdateUserDetailsForm user={mockUser} onEdit={onEdit} onClose={onClose} />
    );

    // Click the cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Ensure the onClose callback is called
    expect(onClose).toHaveBeenCalled();
  });
});
