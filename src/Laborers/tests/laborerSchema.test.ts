import { describe, it, expect } from 'vitest';
import { LaborerSchema } from '../domain/schemas';

describe('LaborerSchema Validation', () => {
  const validLaborer = {
    id: 'test-id-123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    hireDate: '2024-01-15',
    role: 'user' as const,
    picture: 'https://example.com/avatar.jpg',
  };

  it('should validate correct laborer data', () => {
    const result = LaborerSchema.safeParse(validLaborer);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email format', () => {
    const invalidLaborer = {
      ...validLaborer,
      email: 'not-an-email',
    };
    const result = LaborerSchema.safeParse(invalidLaborer);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(issue => issue.path.includes('email'))).toBe(true);
    }
  });

  it('should reject invalid role', () => {
    const invalidLaborer = {
      ...validLaborer,
      role: 'invalid-role' as string,
    };
    const result = LaborerSchema.safeParse(invalidLaborer);
    expect(result.success).toBe(false);
  });

  it('should reject short names', () => {
    const invalidLaborer = {
      ...validLaborer,
      firstName: 'J',
      lastName: 'D',
    };
    const result = LaborerSchema.safeParse(invalidLaborer);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });

  it('should reject invalid URL for picture', () => {
    const invalidLaborer = {
      ...validLaborer,
      picture: 'not-a-url',
    };
    const result = LaborerSchema.safeParse(invalidLaborer);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(issue => issue.path.includes('picture'))).toBe(true);
    }
  });
});
