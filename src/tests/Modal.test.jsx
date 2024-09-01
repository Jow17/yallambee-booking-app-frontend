import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';
import '@testing-library/jest-dom';

describe('Modal Component', () => {
  const onClose = jest.fn();

  it('renders correctly with children', () => {
    render(
      <Modal onClose={onClose}>
        <p>Test Modal Content</p>
      </Modal>
    );

    // Check if the modal content is rendered
    expect(screen.getByText('Test Modal Content')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <Modal onClose={onClose}>
        <p>Test Modal Content</p>
      </Modal>
    );

    // Use getByLabelText to find the button by its aria-label
    fireEvent.click(screen.getByLabelText('Close modal'));

    // Check if onClose was called
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has the correct accessibility attributes', () => {
    render(
      <Modal onClose={onClose}>
        <p>Test Modal Content</p>
      </Modal>
    );

    // Use getByTestId to find the modal
    const modalElement = screen.getByTestId('modal');
    expect(modalElement).toHaveAttribute('aria-hidden', 'true');
    expect(modalElement).toHaveAttribute('aria-modal', 'true');
    expect(modalElement).toHaveAttribute('tabIndex', '-1');
  });
});
