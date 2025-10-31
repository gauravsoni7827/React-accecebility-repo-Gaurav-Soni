import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StringCalculator from './stringCalculator';

describe('String calculator Component', () => {
  test('renders headings correctly', () => {
    render(<StringCalculator />);

    expect(
      screen.getByRole('heading', { level: 2, name: /string calculator/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { level: 1, name: /enter numbers/i })
    ).toBeInTheDocument();
  });

  test('renders image with correct src and dimensions', () => {
    render(<StringCalculator />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('unsplash.com/photo-1594352161389')
    );
    expect(img).toHaveAttribute('width', '600');
    expect(img).toHaveAttribute('height', '400');
  });

  test('renders textarea and allows typing', () => {
    render(<StringCalculator />);
    const textarea = screen.getByPlaceholderText(/enter numbers/i);
    expect(textarea).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: '1,2,3' } });
    expect(textarea).toHaveValue('1,2,3');
  });

  test('renders Calculate button style', () => {
    render(<StringCalculator />);
    const button = screen.getByText(/calculate/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ backgroundColor: '#008cba' });
  });

  test('clicking Calculate does not throw error', () => {
    render(<StringCalculator />);
    const button = screen.getByText(/calculate/i);
    expect(() => fireEvent.click(button)).not.toThrow();
  });

  test('does not show result initially', () => {
    render(<StringCalculator />);
    const result = screen.queryByText(/result:/i);
    expect(result).not.toBeInTheDocument();
  });

  test("renders alert message with role='alert'", () => {
    render(<StringCalculator />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(
      screen.getByText(/make sure you enter numbers correctly/i)
    ).toBeInTheDocument();
  });
});
