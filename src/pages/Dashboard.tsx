import { useState, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Goal, TimetableEvent, Note, Scribble } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { v4 as uuidv4 } from 'uuid';

export default function Dashboard() {
  const [goals, setGoals] = useLocalStorage<Goal[]>('goals', []);
  const [events] = useLocalStorage<TimetableEvent[]>('timetable-events', []);
  const [notes] = useLocalStorage<Note[]>('notes', []);
  const [scribbles] = useLocalStorage<Scribble[]>('scribbles', []);
  const [newGoal, setNewGoal] = useState('');

  const handleAddGoal = () => {
    if (newGoal) {
      setGoals([...goals, { id: uuidv4(), title: newGoal, completed: false }]);
      setNewGoal('');
    }
  };

  const toggleGoal = (id: string) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const upcomingEvent = useMemo(() => {
    const now = new Date();
    return events
      .filter(event => new Date(event.startTime) > now)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())[0];
  }, [events]);

  const completedGoals = useMemo(() => goals.filter(g => g.completed).length, [goals]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-8">Welcome to your MedStudent Hub!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Event</CardTitle>
            </CardHeader>
            <CardContent>
                {upcomingEvent ? (
                    <div>
                        <p className="font-semibold">{upcomingEvent.title}</p>
                        <p className="text-sm text-muted-foreground">{new Date(upcomingEvent.startTime).toLocaleString()}</p>
                    </div>
                ) : (
                    <p>No upcoming events.</p>
                )}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Goals Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{completedGoals} of {goals.length} goals completed.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{notes.length} notes</p>
                <p>{scribbles.length} scribbles</p>
            </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Your Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="New goal..."
              />
              <Button onClick={handleAddGoal}>Add Goal</Button>
            </div>
            <div className="space-y-2">
              {goals.map((goal) => (
                <div key={goal.id} className="flex items-center gap-2">
                  <Checkbox
                    id={goal.id}
                    checked={goal.completed}
                    onCheckedChange={() => toggleGoal(goal.id)}
                  />
                  <label
                    htmlFor={goal.id}
                    className={`flex-1 ${goal.completed ? 'text-muted-foreground line-through' : ''}`}>
                    {goal.title}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
