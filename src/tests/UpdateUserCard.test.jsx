import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserCard from '../components/UserCard';
import '@testing-library/jest-dom';

describe('UserCard Component', () => {
  const mockUser = {
    _id: 'user123',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    phone: '123456789',
    dob: '1990-01-01',
    isAdmin: true,
  };

  const onEdit = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

//   it('calls onEdit when the form is submitted', async () => {
//     render(<UserCard user={mockUser} onEdit={onEdit} onDelete={onDelete} />);
  
//     // Open the edit modal
//     fireEvent.click(screen.getByText('Edit'));
  
//     // Change the user's first name
//     fireEvent.change(screen.getByLabelText('First Name'), {
//       target: { value: 'Jane' },
//     });
  
//     // Submit the form
//     fireEvent.click(screen.getByText('Save'));
  
//     // Check that onEdit was called at all
//     await waitFor(() => {
//       expect(onEdit).toHaveBeenCalled();
//     });
//   });

  it('calls onDelete when the delete button is clicked', () => {
    render(<UserCard user={mockUser} onEdit={onEdit} onDelete={onDelete} />);

    // Click the "Delete" button
    fireEvent.click(screen.getByText('Delete'));

    // Ensure onDelete is called with the correct user ID
    expect(onDelete).toHaveBeenCalledWith('user123');
  });
});
