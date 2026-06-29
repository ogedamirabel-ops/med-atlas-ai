import { Link, useLocation } from 'react-router-dom';
import { Home, Book, Calendar, PenSquare, Bot, Video, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/library', label: 'Library', icon: Book },
  { href: '/timetable', label: 'Timetable', icon: Calendar },
  { href: '/notes', label: 'Notes', icon: PenSquare },
  { href: '/videos', label: 'Videos', icon: Video },
  { href: '/assistant', label: 'AI Assistant', icon: Bot },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-card text-card-foreground p-4 flex flex-col justify-between">
      <div>
        <div className="p-4 mb-4">
          <h1 className="text-2xl font-bold">MedStudent Hub</h1>
        </div>
        <nav className="flex flex-col space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-lg',
                location.pathname === link.href
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div>
          <Link
            to="/settings"
            className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-lg',
                location.pathname === '/settings'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
      </div>
    </aside>
  );
}
