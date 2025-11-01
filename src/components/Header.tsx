'use client'

interface HeaderProps {
  title: string
  onMenuClick?: () => void
}

export default function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200/60 dark:border-white/10 px-4 md:px-10 py-4 bg-white dark:bg-background-dark sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-xl">menu</span>
        </button>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
          <span className="material-symbols-outlined text-xl">notifications</span>
        </button>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvJW2xygWD6A2tLJOG0Rez9qxgTUW5PCEwWkVPzNukvhs2eE2A5PiUBnDTcUh5GX2jZVXC0otgw0rXsw5Nvwvq3RdCjdJssniVKps-fAkyHMY--MMbemMbvoxDhOjrWsDO47YHabGdJUL6IfKHOOSMJgVeqZX_xMAzxistJSrdFJtt4MZwv0WQYYbqR0qNC5i-yzGTAEhGH-HPGZmpl3s5b9HRZjsjM41iGDn0sCZ1Kh_YZxC-Og-q0aju5ucdjO6oC_4r12BeLFY")' }}></div>
      </div>
    </header>
  )
}