import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}));

describe('Sidebar', () => {
  it('renders the logo and app name', () => {
    render(<Sidebar isOpen={true} />);
    expect(screen.getByText('Prodash')).toBeInTheDocument();
  });

  it('renders main navigation items', () => {
    render(<Sidebar isOpen={true} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Weekly Planner')).toBeInTheDocument();
    expect(screen.getByText('Habit Tracker')).toBeInTheDocument();
    expect(screen.getByText('Smart Money')).toBeInTheDocument();
  });

  it('renders bottom navigation items', () => {
    render(<Sidebar isOpen={true} />);
    expect(screen.getByText('Help')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('applies correct classes when open', () => {
    const { container } = render(<Sidebar isOpen={true} />);
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('translate-x-0');
  });

  it('applies correct classes when closed', () => {
    const { container } = render(<Sidebar isOpen={false} />);
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('-translate-x-full');
  });
});

