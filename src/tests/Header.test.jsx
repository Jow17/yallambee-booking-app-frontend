import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from '../context/userContext' // Adjust the import based on your project structure
import Header from '../components/Header' // Adjust the import based on your project structure

// Mock the UserContext provider
const mockSetUser = vi.fn()

const renderHeader = (user = null, isAdmin = false) => {
  const value = { user, setUser: mockSetUser }
  
  render(
    <UserContext.Provider value={value}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </UserContext.Provider>
  )
}

describe('Header Component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'mock-token') // Mock the token in local storage
  })

  afterEach(() => {
    localStorage.removeItem('token') // Clean up after each test
    vi.clearAllMocks() // Clear mock function calls
  })

  test('renders logo correctly', () => {
    renderHeader()
    const logo = screen.getByAltText('Logo')
    expect(logo).toBeInTheDocument()
  })

  test('shows admin link if user is admin', () => {
    renderHeader({ _id: '1' }, true)
    const adminLink = screen.getByText('Admin')
    expect(adminLink).toBeInTheDocument()
  })

  test('does not show admin link if user is not admin', () => {
    renderHeader({ _id: '1' }, false)
    const adminLink = screen.queryByText('Admin')
    expect(adminLink).not.toBeInTheDocument()
  })

  test('shows account and logout links if user is logged in', () => {
    renderHeader({ _id: '1' })
    expect(screen.getByText('Account')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  test('shows login link if user is not logged in', () => {
    renderHeader(null)
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  test('calls handleLogout when Logout is clicked', () => {
    renderHeader({ _id: '1' })
    const logoutLink = screen.getByText('Logout')

    fireEvent.click(logoutLink)

    expect(mockSetUser).toHaveBeenCalledWith(null)
    expect(screen.getByText('Login')).toBeInTheDocument() // Ensure login link is visible after logout
  })
})