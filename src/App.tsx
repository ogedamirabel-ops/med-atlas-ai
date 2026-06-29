import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import Timetable from './pages/Timetable';
import Notes from './pages/Notes';
import Videos from './pages/Videos';
import Assistant from './pages/Assistant';
import Settings from './pages/Settings';
import { Toaster } from '@/components/ui/sonner';
import { useTheme } from './hooks/use-theme';
import { useFontSize } from './hooks/use-font-size';

function App() {
  useTheme();
  useFontSize();
  return (
    <Router>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/library" element={<Library />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
