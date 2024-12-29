import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '@/components/error-boundary';

describe('ErrorBoundary', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  it('renders error message when child component throws', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
    
    spy.mockRestore();
  });

  it('shows reload button', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/reload page/i)).toBeInTheDocument();
    
    spy.mockRestore();
  });
});