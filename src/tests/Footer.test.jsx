import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import '@testing-library/jest-dom';

// Mock the logo image since Jest doesn't handle image imports
jest.mock('../assets/img/logowhite-1.png', () => 'logo.png');

describe('Footer Component', () => {
  it('renders correctly with logo and copyright text', () => {
    render(<Footer />);

    // Check that the logo is rendered with the correct src and alt text
    const logo = screen.getByAltText('Yallambee Tiny Homes Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'logo.png');

    // Check that the logo links back to the homepage
    expect(logo.closest('a')).toHaveAttribute('href', '/');

    // Check that the copyright text is rendered
    expect(screen.getByText('Copyright © 2024. All rights reserved.')).toBeInTheDocument();
  });
});
