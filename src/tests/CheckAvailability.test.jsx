import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckAvailability from '../components/CheckAvailability';
import axios from 'axios';

// Mocking the axios module and window.alert
jest.mock('axios');
beforeAll(() => {
  global.alert = jest.fn();
});

describe('CheckAvailability Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  it('alerts if dates are missing when submitting', async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ id: '1', name: 'Tiny Home 1' }, { id: '2', name: 'Tiny Home 2' }]
    });

    render(<CheckAvailability />);

    // Wait for the SelectProperty dropdown to be populated and displayed
    await waitFor(() => {
      fireEvent.click(screen.getByText('Property'));
      expect(screen.getByText('Tiny Home 1')).toBeInTheDocument();
    });

    // Simulate selecting a property
    fireEvent.click(screen.getByText('Tiny Home 1'));

    // Click on the check availability button
    fireEvent.click(screen.getByText(/Check availability/i));

    // Assert the alert is called with the missing dates message
    expect(alert).toHaveBeenCalledWith('Please select both check-in and check-out dates.');
  });
});
