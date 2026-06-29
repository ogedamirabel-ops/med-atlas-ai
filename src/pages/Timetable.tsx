import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { TimetableEvent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export default function Timetable() {
  const [events, setEvents] = useLocalStorage<TimetableEvent[]>('timetable-events', []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', startTime: '', endTime: '' });

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.startTime && newEvent.endTime) {
      setEvents([...events, { ...newEvent, id: uuidv4(), startTime: new Date(newEvent.startTime), endTime: new Date(newEvent.endTime) }]);
      setNewEvent({ title: '', startTime: '', endTime: '' });
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      events.forEach((event) => {
        const startTime = new Date(event.startTime);
        if (startTime.getFullYear() === now.getFullYear() &&
            startTime.getMonth() === now.getMonth() &&
            startTime.getDate() === now.getDate() &&
            startTime.getHours() === now.getHours() &&
            startTime.getMinutes() === now.getMinutes()) {
          toast.info(`Event starting now: ${event.title}`);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Timetable</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <Input
                type="datetime-local"
                placeholder="Start Time"
                value={newEvent.startTime}
                onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
              />
              <Input
                type="datetime-local"
                placeholder="End Time"
                value={newEvent.endTime}
                onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
              />
            </div>
            <Button onClick={handleAddEvent}>Add</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Start: {new Date(event.startTime).toLocaleString()}</p>
              <p>End: {new Date(event.endTime).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
