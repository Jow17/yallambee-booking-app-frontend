import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SelectProperty from '../components/SelectProperty';
import axios from 'axios';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('SelectProperty Component', () => {
  const setSelectedProperty = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('opens dropdown and shows first property', async () => {
    const mockProperties = [
      { _id: '1', name: 'Tiny Home 1' }
    ];
    axios.get.mockResolvedValueOnce({ data: mockProperties });

    render(<SelectProperty selectedProperty={null} setSelectedProperty={setSelectedProperty} />);

    // Open the dropdown
    fireEvent.click(screen.getByText('Property'));

    // Check that "Tiny Home 1" appears in the dropdown
    await waitFor(() => {
      expect(screen.getByText('Tiny Home 1')).toBeInTheDocument();
    });
  });
});
