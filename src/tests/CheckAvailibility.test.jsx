// import React from 'react'
// import { render, screen, fireEvent } from '@testing-library/react'
// import CheckAvailability from '../components/CheckAvailability.jsx'
// import axios from 'axios'

// vi.mock('axios')

// const mockUnavailableDates = ['2024-09-02T00:00:00Z']

// describe('CheckAvailability Component', () => {
//   beforeEach(() => {
//     axios.get.mockResolvedValue({ data: mockUnavailableDates })
//   })

//   test('alerts when no property is selected', () => {
//     render(<CheckAvailability />)
//     window.alert = vi.fn()

//     const checkButton = screen.getByRole('button', { name: /check availability/i })
//     fireEvent.click(checkButton)

//     expect(window.alert).toHaveBeenCalledWith('Please select a property.')
//   })

//   test('alerts when dates are not selected', () => {
//     render(<CheckAvailability />)
//     window.alert = vi.fn()

//     const selectProperty = screen.getByPlaceholderText(/select property/i)
//     fireEvent.change(selectProperty, { target: { value: 'Cozy Cottage' } })

//     const checkButton = screen.getByRole('button', { name: /check availability/i })
//     fireEvent.click(checkButton)

//     expect(window.alert).toHaveBeenCalledWith('Please select both check-in and check-out dates.')
//   })

//   test('alerts when selected dates are unavailable', async () => {
//     render(<CheckAvailability />)
//     window.alert = vi.fn()

//     fireEvent.change(screen.getByPlaceholderText(/select property/i), { target: { value: 'Cozy Cottage' } })
//     fireEvent.change(screen.getByPlaceholderText(/check-in/i), { target: { value: '2024-09-02' } })
//     fireEvent.change(screen.getByPlaceholderText(/check-out/i), { target: { value: '2024-09-03' } })

//     const checkButton = screen.getByRole('button', { name: /check availability/i })
//     fireEvent.click(checkButton)

//     expect(window.alert).toHaveBeenCalledWith('These dates are not available, please choose another date.')
//   })

//   test('alerts when selected dates are available', async () => {
//     render(<CheckAvailability />)
//     window.alert = vi.fn()

//     fireEvent.change(screen.getByPlaceholderText(/select property/i), { target: { value: 'Cozy Cottage' } })
//     fireEvent.change(screen.getByPlaceholderText(/check-in/i), { target: { value: '2024-09-05' } })
//     fireEvent.change(screen.getByPlaceholderText(/check-out/i), { target: { value: '2024-09-06' } })

//     const checkButton = screen.getByRole('button', { name: /check availability/i })
//     fireEvent.click(checkButton)

//     expect(window.alert).toHaveBeenCalledWith('The selected dates are available for Cozy Cottage.')
//   })
// })