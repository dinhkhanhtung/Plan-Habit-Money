import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

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

describe('Header', () => {
  it('renders the title', () => {
    render(<Header title="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('calls onMenuClick when hamburger menu is clicked', () => {
    const onMenuClick = jest.fn();
    render(<Header title="Dashboard" onMenuClick={onMenuClick} />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    
    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });

  it('renders notification button', () => {
    const { container } = render(<Header title="Dashboard" />);
    // Find all material-symbols-outlined elements and check if one contains "notifications"
    const icons = container.querySelectorAll('.material-symbols-outlined');
    const notificationIcon = Array.from(icons).find(icon => icon.textContent?.includes('notifications'));
    expect(notificationIcon).toBeInTheDocument();
  });

  it('renders user avatar', () => {
    const { container } = render(<Header title="Dashboard" />);
    const avatar = container.querySelector('.bg-cover.rounded-full');
    expect(avatar).toBeInTheDocument();
  });
});

