import { render, screen, fireEvent } from '@testing-library/react';
import AppLayout from '../AppLayout';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}));

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        name: 'Test User',
        email: 'test@example.com',
      },
    },
    status: 'authenticated',
  }),
  signOut: jest.fn(),
}));

describe('AppLayout', () => {
  it('renders children content', () => {
    render(
      <AppLayout title="Test Page">
        <div>Test Content</div>
      </AppLayout>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders header with correct title', () => {
    render(
      <AppLayout title="Dashboard">
        <div>Content</div>
      </AppLayout>
    );
    // Use getAllByText since "Dashboard" appears in both sidebar and header
    const dashboardElements = screen.getAllByText('Dashboard');
    expect(dashboardElements.length).toBeGreaterThan(0);
  });

  it('renders sidebar', () => {
    render(
      <AppLayout title="Test">
        <div>Content</div>
      </AppLayout>
    );
    expect(screen.getByText('Prodash')).toBeInTheDocument();
  });

  it('toggles sidebar when menu button is clicked', () => {
    const { container } = render(
      <AppLayout title="Test">
        <div>Content</div>
      </AppLayout>
    );

    const menuButton = screen.getByLabelText('Toggle menu');
    const sidebar = container.querySelector('aside');

    // Initially closed on mobile
    expect(sidebar).toHaveClass('-translate-x-full');

    // Click to open
    fireEvent.click(menuButton);
    expect(sidebar).toHaveClass('translate-x-0');

    // Click to close
    fireEvent.click(menuButton);
    expect(sidebar).toHaveClass('-translate-x-full');
  });
});

