import { useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Note, Scribble } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { v4 as uuidv4 } from 'uuid';
import { ScribbleCanvas } from '@/components/ScribbleCanvas';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function Notes() {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [scribbles, setScribbles] = useLocalStorage<Scribble[]>('scribbles', []);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isScribbleMode, setIsScribbleMode] = useState(false);

  const handleNewNote = () => {
    const newNote: Note = {
      id: uuidv4(),
      title: 'New Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes([...notes, newNote]);
    setCurrentNote(newNote);
    setIsScribbleMode(false);
  };

  const handleUpdateNote = (field: 'title' | 'content', value: string) => {
    if (currentNote) {
      const updatedNote = { ...currentNote, [field]: value, updatedAt: new Date() };
      setCurrentNote(updatedNote);
      setNotes(notes.map((n) => (n.id === currentNote.id ? updatedNote : n)));
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (currentNote?.id === id) {
      setCurrentNote(null);
    }
  };

  const handleSaveScribble = (dataUrl: string) => {
    const newScribble: Scribble = {
        id: uuidv4(),
        dataUrl,
        createdAt: new Date(),
    };
    setScribbles([...scribbles, newScribble]);
  }

  const handleDeleteScribble = (id: string) => {
    setScribbles(scribbles.filter((s) => s.id !== id));
  }

  return (
    <div className="p-8 flex gap-8 h-[calc(100vh-4rem)]">
      <div className="w-1/4 flex flex-col gap-4">
        <Button onClick={handleNewNote} className="w-full">New Note</Button>
        <div className="flex items-center space-x-2">
            <Switch id="scribble-mode" checked={isScribbleMode} onCheckedChange={setIsScribbleMode} />
            <Label htmlFor="scribble-mode">Scribble Mode</Label>
        </div>
        <div className="space-y-2 overflow-y-auto">
            <h2 className="text-lg font-semibold">Notes</h2>
          {notes.map((note) => (
            <Card key={note.id} onClick={() => {setCurrentNote(note); setIsScribbleMode(false);}} className={`cursor-pointer ${currentNote?.id === note.id ? 'border-primary' : ''}`}>
              <CardHeader className="flex flex-row items-center justify-between p-4">
                <CardTitle className="text-lg">{note.title}</CardTitle>
                <Button variant="ghost" size="sm" onClick={(e) => {e.stopPropagation(); handleDeleteNote(note.id)}}>X</Button>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{new Date(note.updatedAt).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
           <h2 className="text-lg font-semibold mt-4">Scribbles</h2>
           {scribbles.map((scribble) => (
             <Card key={scribble.id} className="cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between p-4">
                    <CardTitle className="text-lg">Scribble {new Date(scribble.createdAt).toLocaleDateString()}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={(e) => {e.stopPropagation(); handleDeleteScribble(scribble.id)}}>X</Button>
                </CardHeader>
               <CardContent className="p-4">
                 <img src={scribble.dataUrl} alt="Scribble" className="w-full h-auto rounded-md" />
               </CardContent>
             </Card>
           ))}
        </div>
      </div>
      <div className="w-3/4">
        {isScribbleMode ? (
            <ScribbleCanvas onSave={handleSaveScribble} />
        ) : currentNote ? (
          <div className="flex flex-col h-full">
            <Input
              value={currentNote.title}
              onChange={(e) => handleUpdateNote('title', e.target.value)}
              className="text-2xl font-bold mb-4"
            />
            <Textarea
              value={currentNote.content}
              onChange={(e) => handleUpdateNote('content', e.target.value)}
              className="flex-1"
              placeholder="Start writing your note..."
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Select a note to view or create a new one. Or, toggle scribble mode!</p>
          </div>
        )}
      </div>
    </div>
  );
}
