import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const mockResponses: Record<string, string> = {
  'past paper': `Here is a mock past paper on Anatomy:

**Section A: Multiple Choice Questions**
1. Which of the following is NOT a bone of the axial skeleton?
   a) Sternum
   b) Ribs
   c) Scapula
   d) Vertebral column

**Section B: Short Answer Questions**
1. Describe the structure of a typical long bone.
2. Explain the difference between a ligament and a tendon.`,
  'q&a': `Of course! Ask me any question.
Example: What is the function of the mitochondria?
Answer: The mitochondrion is a double-membraned organelle found in most eukaryotic organisms. Mitochondria generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy.`,
  'default': `I am a medical study AI assistant. You can ask me to generate past papers, provide Q&A on medical topics, and more. How can I help you today?`,
};

const getAIResponse = (message: string): string => {
    const lowerCaseMessage = message.toLowerCase();
    for (const key in mockResponses) {
        if (lowerCaseMessage.includes(key)) {
        return mockResponses[key];
        }
    }
    return mockResponses['default'];
};

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    const aiResponse: Message = { text: getAIResponse(input), sender: 'ai' };
    setMessages((prev) => [...prev, aiResponse]);

    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="bg-primary text-primary-foreground p-4 text-center">
        <h1 className="text-xl font-bold">AI Assistant</h1>
      </header>
      <ScrollArea className="flex-grow p-4">
        <div className="flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              <div
                className={`rounded-lg p-3 max-w-xs ${ 
                    msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <footer className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask the AI anything..."
            className="flex-grow"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </footer>
    </div>
  );
}
