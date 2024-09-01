import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';
import { UserContext } from '../context/userContext';
import '@testing-library/jest-dom';
import { jwtDecode } from 'jwt-decode';

// Mocking dependencies
jest.mock('jwt-decode');
jest.mock('../assets/img/logodark-1.png', () => 'logodark.png');
jest.mock('../assets/img/logowhite-1.png', () => 'logowhite.png');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    pathname: '/',
  }),
}));

describe('Header Component', () => {
  const setUser = jest.fn();
  const handleLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders logo and navigation links correctly for a logged-out user', () => {
    render(
      <UserContext.Provider value={{ user: null, setUser }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </UserContext.Provider>
    );

    // Check for the logo
    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    // Check for the navigation links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Tiny Homes')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders admin link and account link for a logged-in admin user', () => {
    const mockUser = { _id: '1', isAdmin: true };
    const token = 'mocked-token';
    jwtDecode.mockReturnValue({ isAdmin: true });

    localStorage.setItem('token', token);

    render(
      <UserContext.Provider value={{ user: mockUser, setUser }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </UserContext.Provider>
    );

    // Check for the admin link
    expect(screen.getByText('Admin')).toBeInTheDocument();

    // Check for the account link
    expect(screen.getByText('Account')).toBeInTheDocument();

    // Check for the logout link
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('handles logout correctly', () => {
    const mockUser = { _id: '1', isAdmin: true };
    const token = 'mocked-token';
    jwtDecode.mockReturnValue({ isAdmin: true });

    localStorage.setItem('token', token);

    render(
      <UserContext.Provider value={{ user: mockUser, setUser }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </UserContext.Provider>
    );

    fireEvent.click(screen.getByText('Logout'));

    // Check if setUser was called with null
    expect(setUser).toHaveBeenCalledWith(null);

    // Check if token was removed
    expect(localStorage.getItem('token')).toBeNull();
  });
});
