export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverUrl?: string;
}

export interface TimetableEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  description?: string;
}

export interface Goal {
  id: string;
  title: string;
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Scribble {
    id: string;
    dataUrl: string;
    createdAt: Date;
}
