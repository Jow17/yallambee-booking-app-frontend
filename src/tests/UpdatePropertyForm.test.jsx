import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UpdatePropertyForm from '../components/UpdatePropertyForm';
import '@testing-library/jest-dom';
import axios from 'axios';

// Mock axios to avoid real API calls during testing
jest.mock('axios');

describe('UpdatePropertyForm Component', () => {
  const mockProperty = {
    _id: 'property123',
    name: 'Test Property',
    description: 'A beautiful tiny home with all amenities.',
    price: 150,
    size: 45,
    maxPerson: 4,
    availability: ['2024-09-01', '2024-09-02'],
    images: ['image1.jpg', 'image2.jpg'],
    location: {
      city: 'Test City',
      state: 'Test State',
    },
    ageRestriction: 18,
  };

  const onEdit = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial property details', () => {
    render(
      <UpdatePropertyForm property={mockProperty} onEdit={onEdit} onClose={onClose} />
    );

    // Check if the form fields are rendered with the correct initial values
    expect(screen.getByLabelText('Property Name').value).toBe(mockProperty.name);
    expect(screen.getByLabelText('Description').value).toBe(mockProperty.description);
    expect(screen.getByLabelText('Price per Night').value).toBe(String(mockProperty.price));
    expect(screen.getByLabelText('Property Size (m²)').value).toBe(String(mockProperty.size));
    expect(screen.getByLabelText('Max Guests').value).toBe(String(mockProperty.maxPerson));
    expect(screen.getByLabelText('Availability (comma-separated dates in YYYY-MM-DD format)').value).toBe(mockProperty.availability.join(', '));
    expect(screen.getByLabelText('Image URLs (comma-separated)').value).toBe(mockProperty.images.join(', '));
    expect(screen.getByPlaceholderText('City').value).toBe(mockProperty.location.city);
    expect(screen.getByPlaceholderText('State').value).toBe(mockProperty.location.state);
    expect(screen.getByLabelText('Age Restriction').value).toBe(String(mockProperty.ageRestriction));
  });

  it('handles form submission and calls onEdit with updated data', async () => {
    axios.put.mockResolvedValueOnce({
      data: { ...mockProperty, name: 'Updated Property', price: 200, maxPerson: 5 }
    });

    render(
      <UpdatePropertyForm property={mockProperty} onEdit={onEdit} onClose={onClose} />
    );

    // Change form values
    fireEvent.change(screen.getByLabelText('Property Name'), { target: { value: 'Updated Property' } });
    fireEvent.change(screen.getByLabelText('Price per Night'), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText('Max Guests'), { target: { value: '5' } });

    // Submit the form
    fireEvent.click(screen.getByText('Save'));

    // Wait for the axios call to resolve
    await waitFor(() => {
      expect(onEdit).toHaveBeenCalledWith({
        ...mockProperty,
        name: 'Updated Property',
        price: 200,
        maxPerson: 5,
      });
      expect(onClose).toHaveBeenCalled(); // Ensure the form is closed after submission
    });
  });

//   it('handles comma-separated input fields correctly', async () => {
//     render(
//       <UpdatePropertyForm property={mockProperty} onEdit={onEdit} onClose={onClose} />
//     );

//     // Change the availability and images fields
//     fireEvent.change(screen.getByLabelText('Image URLs (comma-separated)'), { target: { value: 'image3.jpg, image4.jpg' } });

//     // Submit the form
//     fireEvent.click(screen.getByText('Save'));

//     // Wait for the axios call to resolve
//     await waitFor(() => {
//       expect(onEdit).toHaveBeenCalledWith({
//         ...mockProperty,
//         // availability: ['2024-09-03', '2024-09-04'],
//         images: ['image3.jpg', 'image4.jpg'],
//       });
//       expect(onClose).toHaveBeenCalled(); // Ensure the form is closed after submission
//     });
//   });

  it('calls onClose when the cancel button is clicked', () => {
    render(
      <UpdatePropertyForm property={mockProperty} onEdit={onEdit} onClose={onClose} />
    );

    // Click the cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Ensure the onClose callback is called
    expect(onClose).toHaveBeenCalled();
  });
});
