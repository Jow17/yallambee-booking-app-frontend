import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BookingCard from '../components/BookingCard.jsx'
import '@testing-library/jest-dom'

const mockOnDelete = vi.fn()
const mockOnEdit = vi.fn()

const mockBooking = {
  _id: '1',
  startDate: '2024-09-01T00:00:00Z',
  endDate: '2024-09-10T00:00:00Z',
  totalPrice: 500,
  property: {
    _id: '2',
    name: 'Cozy Cottage',
    description: 'A lovely cottage in the countryside.',
    size: 120,
    maxPerson: 4,
    images: ['https://example.com/image.jpg'],
  },
}

describe('BookingCard Component', () => {
  test('calls onDelete when cancel button is clicked', () => {
    render(<BookingCard booking={mockBooking} onDelete={mockOnDelete} onEdit={mockOnEdit} />)

    // Using `getByRole` to find the button
    const cancelButton = screen.getByRole('button', { name: /cancel/i })  // Case-insensitive regex match
    fireEvent.click(cancelButton)

    expect(mockOnDelete).toHaveBeenCalledWith(mockBooking._id)
  })
})