import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /Click Me/i });

    expect(button).toBeInTheDocument();
  });

  it('renders with danger variant', () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByRole('button', { name: /Delete/i });

    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole('button', { name: /Click Me/i });

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with the correct type attribute', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button', { name: /Submit/i });

    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders with the correct type when type is not passed', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /Click Me/i });

    expect(button).toHaveAttribute('type', 'button');
  });
});
