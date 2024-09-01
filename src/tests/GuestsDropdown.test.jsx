import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GuestsDropdown from '../components/GuestsDropdown';
import '@testing-library/jest-dom';

describe('GuestsDropdown Component', () => {
  const setSelectedGuests = jest.fn();

  it('renders correctly with the initial selected guest', () => {
    render(
      <GuestsDropdown selectedGuests="1 Guest" setSelectedGuests={setSelectedGuests} />
    );

    // Check if the initial selected guest is rendered in the button
    expect(screen.getByText('1 Guest')).toBeInTheDocument();
  });

  it('opens the dropdown and displays options when clicked', () => {
    render(
      <GuestsDropdown selectedGuests="1 Guest" setSelectedGuests={setSelectedGuests} />
    );

    // Click the dropdown button to open it
    fireEvent.click(screen.getByText('1 Guest'));

    // Ensure both options are displayed after opening the dropdown
    const options = screen.getAllByText('1 Guest');
    expect(options).toHaveLength(2); // One in the button and one in the dropdown

    // Ensure the second option is displayed
    expect(screen.getByText('2 Guests')).toBeInTheDocument();
  });

  it('calls setSelectedGuests when an option is selected', () => {
    render(
      <GuestsDropdown selectedGuests="1 Guest" setSelectedGuests={setSelectedGuests} />
    );

    // Click the dropdown button to open it
    fireEvent.click(screen.getByText('1 Guest'));

    // Click the '2 Guests' option inside the dropdown
    fireEvent.click(screen.getAllByText('2 Guests')[0]);

    // Check if setSelectedGuests was called with the correct argument
    expect(setSelectedGuests).toHaveBeenCalledWith('2 Guests');
  });
});
