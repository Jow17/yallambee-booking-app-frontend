import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyCard from '../components/PropertyCard';
import { UserContext } from '../context/userContext';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

describe('PropertyCard Component', () => {
    const mockProperty = {
      _id: 'property123',
      name: 'Test Property',
      description: 'A beautiful tiny home with a scenic view and modern amenities.',
      size: 45,
      maxPerson: 4,
      price: 150,
      images: ['image1.jpg']
    };
  
    const onDelete = jest.fn();
    const onEdit = jest.fn();
  
    it('renders correctly with property details', () => {
      render(
        <Router>
          <PropertyCard property={mockProperty} onDelete={onDelete} onEdit={onEdit} />
        </Router>
      );
  
      // Check if the property details are displayed
      expect(screen.getByText('Test Property')).toBeInTheDocument();
      expect(screen.getByText('45m²')).toBeInTheDocument();
      expect(screen.getByText('Max People')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
  
      // Check for a substring of the description text using a function matcher
      expect(screen.getByText((content, element) =>
        content.includes('A beautiful tiny home with a scenic view')
      )).toBeInTheDocument();
    });

  it('displays admin buttons if user is an admin', () => {
    const mockUser = { isAdmin: true };

    render(
      <Router>
        <UserContext.Provider value={{ user: mockUser }}>
          <PropertyCard property={mockProperty} onDelete={onDelete} onEdit={onEdit} />
        </UserContext.Provider>
      </Router>
    );

    // Check if the Edit and Delete buttons are displayed for admin users
    expect(screen.getByText('Edit Property')).toBeInTheDocument();
    expect(screen.getByText('Delete Property')).toBeInTheDocument();
  });

  it('displays "Book now" button if user is not an admin', () => {
    const mockUser = { isAdmin: false };

    render(
      <Router>
        <UserContext.Provider value={{ user: mockUser }}>
          <PropertyCard property={mockProperty} onDelete={onDelete} onEdit={onEdit} />
        </UserContext.Provider>
      </Router>
    );

    // Check if the "Book now" button is displayed for non-admin users
    expect(screen.getByText('Book now from $150')).toBeInTheDocument();
  });

  it('calls onEdit when the Edit button is clicked', () => {
    const mockUser = { isAdmin: true };

    render(
      <Router>
        <UserContext.Provider value={{ user: mockUser }}>
          <PropertyCard property={mockProperty} onDelete={onDelete} onEdit={onEdit} />
        </UserContext.Provider>
      </Router>
    );

    // Click the Edit button
    fireEvent.click(screen.getByText('Edit Property'));

    // Check if onEdit was called with the correct property
    expect(onEdit).toHaveBeenCalledWith(mockProperty);
  });

  it('calls onDelete when the Delete button is clicked', () => {
    const mockUser = { isAdmin: true };

    render(
      <Router>
        <UserContext.Provider value={{ user: mockUser }}>
          <PropertyCard property={mockProperty} onDelete={onDelete} onEdit={onEdit} />
        </UserContext.Provider>
      </Router>
    );

    // Click the Delete button
    fireEvent.click(screen.getByText('Delete Property'));

    // Check if onDelete was called with the correct property ID
    expect(onDelete).toHaveBeenCalledWith('property123');
  });

  it('displays a loading message if property details are missing', () => {
    render(
      <Router>
        <PropertyCard property={null} onDelete={onDelete} onEdit={onEdit} />
      </Router>
    );

    // Check if the loading message is displayed
    expect(screen.getByText('Loading property details...')).toBeInTheDocument();
  });
});
