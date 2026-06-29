import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import {
  LayoutGrid,
  Columns2,
  BookOpen,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { mockBooks } from '@/lib/mock-data';
import type { Book } from '@/lib/types';

const categories = ['All', ...new Set(mockBooks.map((book) => book.category))];

function generateBookLines(book: Book): string[] {
  const lines: string[] = [];
  lines.push('h1:' + book.title);
  lines.push('h2:by ' + book.author);
  lines.push('h3:' + book.category);
  lines.push('hr');
  lines.push('h2:Table of Contents');
  lines.push('li:1. Introduction to ' + book.category);
  lines.push('li:2. Fundamental Concepts');
  lines.push('li:3. Core Principles');
  lines.push('li:4. Clinical Applications');
  lines.push('li:5. Advanced Topics');
  lines.push('li:6. Review Questions');
  lines.push('li:7. References & Further Reading');
  lines.push('hr');
  lines.push('h2:Chapter 1: Introduction to ' + book.category);
  lines.push('p:' + book.title + ' by ' + book.author + ' is one of the most widely used textbooks in ' + book.category + '. This comprehensive resource covers all essential topics that medical students need to master.');
  lines.push('blank');
  lines.push('h3:Key Learning Objectives');
  lines.push('li:Understand the fundamental principles of ' + book.category);
  lines.push('li:Apply theoretical knowledge to clinical scenarios');
  lines.push('li:Develop critical thinking skills for medical problem-solving');
  lines.push('li:Master the core concepts tested in medical examinations');
  lines.push('blank');
  lines.push('h3:Overview');
  lines.push('p:This chapter provides a foundational overview of ' + book.category + '. Students should focus on understanding the basic terminology, key structures, and fundamental mechanisms that will be built upon in subsequent chapters.');
  lines.push('p:The study of ' + book.category + ' is essential for all medical students as it forms the basis for understanding more complex clinical conditions.');
  lines.push('hr');
  lines.push('h2:Chapter 2: Fundamental Concepts');
  lines.push('h3:2.1 Basic Principles');
  lines.push('p:The fundamental concepts in ' + book.category + ' revolve around understanding the core mechanisms and their clinical relevance.');
  lines.push('h3:2.2 Key Terminology');
  lines.push('p:Familiarity with the standard terminology used in ' + book.category + ' is crucial for success in both examinations and clinical practice.');
  lines.push('h3:2.3 Clinical Correlations');
  lines.push('p:Understanding how basic science concepts relate to clinical practice is a key skill developed through studying this material.');
  lines.push('hr');
  lines.push('h2:Chapter 3: Core Principles');
  lines.push('h3:3.1 Detailed Mechanisms');
  lines.push('p:This section delves deeper into the mechanisms that underpin ' + book.category + '. Detailed understanding is essential for both examinations and clinical practice.');
  lines.push('h3:3.2 Integration with Other Subjects');
  lines.push('p:' + book.category + ' does not exist in isolation. This section highlights how core principles integrate with physiology, pathology, and pharmacology.');
  lines.push('h3:3.3 High-Yield Facts');
  lines.push('li:Key fact 1: Understanding primary mechanisms is essential');
  lines.push('li:Key fact 2: Clinical presentations reflect underlying principles');
  lines.push('li:Key fact 3: Treatment approaches are based on mechanistic understanding');
  lines.push('li:Key fact 4: Prevention strategies rely on knowledge of risk factors');
  lines.push('li:Key fact 5: Diagnostic approaches follow logical clinical reasoning');
  lines.push('hr');
  lines.push('h2:Chapter 4: Clinical Applications');
  lines.push('h3:4.1 Diagnostic Approaches');
  lines.push('p:Proper diagnosis in ' + book.category + ' requires a systematic approach. This section outlines key diagnostic steps and considerations.');
  lines.push('h3:4.2 Management Strategies');
  lines.push('p:Evidence-based management strategies are discussed, including both conservative and interventional approaches.');
  lines.push('hr');
  lines.push('h2:Chapter 5: Advanced Topics');
  lines.push('p:This section covers the latest developments and research findings in ' + book.category + ' that are relevant to medical practice.');
  lines.push('hr');
  lines.push('h2:Chapter 6: Review Questions');
  lines.push('li:What are the fundamental principles of ' + book.category + '?');
  lines.push('li:How do the core concepts apply to clinical practice?');
  lines.push('li:Describe the diagnostic approach to common conditions.');
  lines.push('li:What are the key management strategies?');
  lines.push('li:Discuss recent advances in the field.');
  lines.push('hr');
  lines.push('italic:This is a simulated reader view for ' + book.title + '.');
  return lines;
}

function BookContent({ book }: { book: Book }) {
  const lines = useMemo(() => generateBookLines(book), [book]);
  return (
    <div className="max-w-none p-6">
      {lines.map((line, i) => {
        if (line.startsWith('h1:')) {
          return <h1 key={i} className="text-2xl font-bold mt-4 mb-2">{line.slice(3)}</h1>;
        }
        if (line.startsWith('h2:')) {
          return <h2 key={i} className="text-xl font-bold mt-8 mb-3">{line.slice(3)}</h2>;
        }
        if (line.startsWith('h3:')) {
          return <h3 key={i} className="text-lg font-semibold mt-6 mb-2">{line.slice(3)}</h3>;
        }
        if (line.startsWith('li:')) {
          return <li key={i} className="ml-4 text-sm leading-relaxed">{line.slice(3)}</li>;
        }
        if (line === 'hr') {
          return <hr key={i} className="my-6 border-border" />;
        }
        if (line.startsWith('italic:')) {
          return <p key={i} className="text-sm italic text-muted-foreground my-2">{line.slice(7)}</p>;
        }
        if (line === 'blank') {
          return <div key={i} className="h-2" />;
        }
        if (line.startsWith('p:')) {
          return <p key={i} className="text-sm leading-relaxed my-1">{line.slice(2)}</p>;
        }
        return null;
      })}
    </div>
  );
}

function BookReaderPanel({
  book,
  onClose,
}: {
  book: Book;
  onClose: () => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 7;

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border shrink-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <BookOpen className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm font-medium truncate">{book.title}</span>
          <Badge variant="secondary" className="text-xs shrink-0">
            {book.category}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0"
          onClick={onClose}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex items-center gap-3 px-4 py-2 border-b border-border bg-muted/20 shrink-0">
        {book.coverUrl && (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-8 h-10 object-cover rounded shadow-sm"
          />
        )}
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground truncate">
            by {book.author}
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <BookContent book={book} />
      </ScrollArea>

      <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30 shrink-0">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="h-7"
        >
          <ChevronLeft className="h-3.5 w-3.5 mr-1" />
          Prev
        </Button>
        <span className="text-xs text-muted-foreground">
          Chapter {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="h-7"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
}

export default function Library() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'split'>('grid');
  const [openedBooks, setOpenedBooks] = useState<Book[]>([]);
  const [showBookSelector, setShowBookSelector] = useState(false);

  const filteredBooks = useMemo(() => {
    return mockBooks.filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const openBook = (book: Book) => {
    if (!openedBooks.find((b) => b.id === book.id)) {
      setOpenedBooks((prev) => [...prev, book]);
    }
    setViewMode('split');
    setShowBookSelector(false);
  };

  const closeBook = (bookId: string) => {
    setOpenedBooks((prev) => prev.filter((b) => b.id !== bookId));
  };

  if (viewMode === 'grid') {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Library</h1>
          <div className="flex items-center gap-2">
            {openedBooks.length > 0 && (
              <Badge variant="secondary" className="text-sm">
                {openedBooks.length} book{openedBooks.length > 1 ? 's' : ''} open
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('split')}
              disabled={openedBooks.length === 0}
              title={openedBooks.length === 0 ? 'Open a book first' : 'Switch to Split View'}
            >
              <Columns2 className="h-4 w-4 mr-2" />
              Split View
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <Input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const isOpen = openedBooks.some((b) => b.id === book.id);
            return (
              <Card key={book.id} className={'relative group transition-all ' + (isOpen ? 'ring-2 ring-primary' : '')}>
                <CardHeader>
                  <img src={book.coverUrl} alt={book.title} className="w-full h-48 object-cover mb-4" />
                  <CardTitle className="text-base">{book.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{book.author}</p>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {book.category}
                  </Badge>
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      variant={isOpen ? 'secondary' : 'default'}
                      className="w-full"
                      onClick={() => openBook(book)}
                    >
                      <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                      {isOpen ? 'Reading' : 'Open'}
                    </Button>
                  </div>
                </CardContent>
                {isOpen && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Open
                    </Badge>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Library
          </Button>
          <span className="text-sm font-medium">
            {'Split View \u2014 ' + openedBooks.length + ' book' + (openedBooks.length !== 1 ? 's' : '') + ' open'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBookSelector(!showBookSelector)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Book
          </Button>
        </div>
      </div>

      {showBookSelector && (
        <div className="border-b border-border bg-muted/30 p-4 shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <Input
              type="text"
              placeholder="Search books to add..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="ghost" size="sm" onClick={() => setShowBookSelector(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-32">
            <div className="flex flex-wrap gap-2">
              {filteredBooks
                .filter((book) => !openedBooks.some((b) => b.id === book.id))
                .map((book) => (
                  <Button
                    key={book.id}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-1.5 px-3"
                    onClick={() => openBook(book)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {book.title}
                  </Button>
                ))}
              {filteredBooks.filter((book) => !openedBooks.some((b) => b.id === book.id)).length === 0 && (
                <p className="text-sm text-muted-foreground py-2">
                  {openedBooks.length === filteredBooks.length
                    ? 'All filtered books are already open'
                    : 'No books match your search'}
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      {openedBooks.length > 0 && (
        <div className="flex items-center gap-1 px-2 py-1 border-b border-border bg-muted/10 overflow-x-auto shrink-0">
          {openedBooks.map((book) => (
            <div
              key={book.id}
              className="flex items-center gap-1 px-3 py-1 rounded-md bg-muted text-xs font-medium whitespace-nowrap"
            >
              <BookOpen className="h-3 w-3" />
              <span className="max-w-[120px] truncate">{book.title}</span>
              <button
                onClick={() => closeBook(book.id)}
                className="ml-1 rounded-full hover:bg-destructive/20 p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex-1 p-2 overflow-hidden">
        {openedBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Columns2 className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Books Open</h2>
            <p className="text-muted-foreground mb-4">
              Add books to start reading in split view
            </p>
            <div className="flex gap-2">
              <Button onClick={() => setShowBookSelector(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Books
              </Button>
              <Button variant="outline" onClick={() => setViewMode('grid')}>
                <LayoutGrid className="h-4 w-4 mr-2" />
                Browse Library
              </Button>
            </div>
          </div>
        ) : openedBooks.length === 1 ? (
          <BookReaderPanel
            book={openedBooks[0]}
            onClose={() => closeBook(openedBooks[0].id)}
          />
        ) : (
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {openedBooks.map((book, index) => (
              <React.Fragment key={book.id}>
                {index > 0 && (
                  <ResizableHandle withHandle />
                )}
                <ResizablePanel
                  defaultSize={Math.floor(100 / openedBooks.length)}
                  minSize={15}
                >
                  <BookReaderPanel
                    book={book}
                    onClose={() => closeBook(book.id)}
                  />
                </ResizablePanel>
              </React.Fragment>
            ))}
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
}
