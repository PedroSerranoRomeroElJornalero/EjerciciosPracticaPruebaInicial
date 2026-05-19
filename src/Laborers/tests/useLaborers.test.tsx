import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLaborers } from '../hooks/useLaborerData';
import * as domain from '../domain/index';

// Mock the domain functions
vi.mock('../domain/index', () => ({
  getLaborers: vi.fn(),
  createLaborer: vi.fn(),
  editLaborer: vi.fn(),
}));

describe('useLaborers Hook', () => {
  let queryClient: QueryClient;

  const mockLaborers = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      hireDate: '2024-01-15',
      role: 'user' as const,
      picture: 'https://example.com/john.jpg',
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      hireDate: '2024-02-20',
      role: 'supervisor' as const,
      picture: 'https://example.com/jane.jpg',
    },
  ];

  const newLaborer = {
    id: '3',
    firstName: 'Bob',
    lastName: 'Wilson',
    email: 'bob@example.com',
    hireDate: '2024-03-10',
    role: 'user' as const,
    picture: 'https://example.com/bob.jpg',
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  describe('Initial Load', () => {
    it('should fetch laborers on mount', async () => {
      const getLaborersMock = vi.spyOn(domain, 'getLaborers').mockResolvedValue(mockLaborers);

      const { result } = renderHook(() => useLaborers(), { wrapper });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(getLaborersMock).toHaveBeenCalled();
      expect(result.current.laborers).toEqual(mockLaborers);
    });

    it('should return empty array initially', () => {
      vi.mocked(domain.getLaborers).mockResolvedValue([]);

      const { result } = renderHook(() => useLaborers(), { wrapper });

      expect(result.current.laborers).toEqual([]);
    });

    it('should handle query errors', async () => {
      const error = new Error('Failed to fetch laborers');
      vi.mocked(domain.getLaborers).mockRejectedValue(error);

      const { result } = renderHook(() => useLaborers(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.queryError).toBeDefined();
    });
  });

  describe('Create Mutation', () => {
    it('should create a new laborer', async () => {
      vi.mocked(domain.getLaborers).mockResolvedValue(mockLaborers);
      vi.mocked(domain.createLaborer).mockResolvedValue(newLaborer);

      const { result } = renderHook(() => useLaborers(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.create.mutate(newLaborer);

      await waitFor(() => {
        expect(result.current.create.isPending).toBe(false);
      });

      expect(vi.mocked(domain.createLaborer)).toHaveBeenCalledWith(newLaborer);
    });

    it('should handle create mutation error', async () => {
      vi.mocked(domain.getLaborers).mockResolvedValue(mockLaborers);
      const error = new Error('Failed to create laborer');
      vi.mocked(domain.createLaborer).mockRejectedValue(error);
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useLaborers(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.create.mutate(newLaborer);

      await waitFor(() => {
        expect(result.current.create.isPending).toBe(false);
      });

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error creating laborer:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Edit Mutation', () => {
    it('should edit an existing laborer', async () => {
      vi.mocked(domain.getLaborers).mockResolvedValue(mockLaborers);
      const updatedLaborer = { ...mockLaborers[0], firstName: 'Jonathan' };
      vi.mocked(domain.editLaborer).mockResolvedValue(updatedLaborer);

      const { result } = renderHook(() => useLaborers(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      result.current.edit.mutate(updatedLaborer);

      await waitFor(() => {
        expect(result.current.edit.isPending).toBe(false);
      });

      expect(vi.mocked(domain.editLaborer)).toHaveBeenCalledWith(updatedLaborer);
    });

    it('should handle edit mutation error', async () => {
      vi.mocked(domain.getLaborers).mockResolvedValue(mockLaborers);
      const error = new Error('Failed to edit laborer');
      vi.mocked(domain.editLaborer).mockRejectedValue(error);
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useLaborers(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const updatedLaborer = { ...mockLaborers[0], firstName: 'Jonathan' };
      result.current.edit.mutate(updatedLaborer);

      await waitFor(() => {
        expect(result.current.edit.isPending).toBe(false);
      });

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error editing laborer:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Return Values', () => {
    it('should return all required properties', async () => {
      vi.mocked(domain.getLaborers).mockResolvedValue(mockLaborers);

      const { result } = renderHook(() => useLaborers(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current).toHaveProperty('laborers');
      expect(result.current).toHaveProperty('isLoading');
      expect(result.current).toHaveProperty('queryError');
      expect(result.current).toHaveProperty('create');
      expect(result.current).toHaveProperty('edit');
    });

    it('should have mutation objects with proper structure', async () => {
      vi.mocked(domain.getLaborers).mockResolvedValue(mockLaborers);

      const { result } = renderHook(() => useLaborers(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.create).toHaveProperty('mutate');
      expect(result.current.create).toHaveProperty('isPending');
      expect(result.current.edit).toHaveProperty('mutate');
      expect(result.current.edit).toHaveProperty('isPending');
    });
  });
});
