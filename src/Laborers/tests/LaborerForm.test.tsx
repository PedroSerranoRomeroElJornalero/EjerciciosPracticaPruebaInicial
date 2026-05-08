import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LaborerForm } from '../components/LaborerForm';

describe('LaborerForm Component', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  const defaultLaborer = {
    id: 'test-id',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    hireDate: '2024-01-15',
    role: 'user' as const,
    picture: 'https://example.com/avatar.jpg',
  };

  it('should render form with all fields', () => {
    render(
      <LaborerForm
        laborer={defaultLaborer}
        saving={false}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByDisplayValue('John')).toBeDefined();
    expect(screen.getByDisplayValue('Doe')).toBeDefined();
    expect(screen.getByDisplayValue('john@example.com')).toBeDefined();
    expect(screen.getByDisplayValue('2024-01-15')).toBeDefined();
    expect(screen.getByDisplayValue('https://example.com/avatar.jpg')).toBeDefined();
  });

  it('should show validation errors for invalid email', async () => {
    const user = userEvent.setup();
    const invalidLaborer = { ...defaultLaborer, email: 'invalid-email' };

    render(
      <LaborerForm
        laborer={invalidLaborer}
        saving={false}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const emailInput = screen.getByDisplayValue('invalid-email') as HTMLInputElement;
    await user.clear(emailInput);
    await user.type(emailInput, 'not-an-email');
    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeDefined();
    });
  });
});
