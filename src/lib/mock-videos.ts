export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
}

export const mockVideos: Video[] = [
    {
    id: '1',
    title: 'How to Study for Exams - Evidence-based revision tips',
    description: 'A video on how to study for exams effectively, with tips based on scientific research.',
    youtubeId: 'fDbF2k5A2d4',
    },
    {
    id: '2',
    title: 'The 9 BEST Scientific Study Tips',
    description: 'Another great video with scientific study tips to help you learn faster and more effectively.',
    youtubeId: 'p60rN9JEapg',
    },
    {
    id: '3',
    title: 'How to Stay Motivated: The Locus Rule',
    description: 'A video on how to stay motivated and achieve your goals by understanding your locus of control.',
    youtubeId: '8Z7_H2CqP3M',
    },
    {
    id: '4',
    title: 'A Day in the Life of a Medical Student',
    description: 'Get a glimpse into the life of a medical student and see what it takes to succeed.',
    youtubeId: 'kuttiY6c3eA',
    },
    {
    id: '5',
    title: 'How to Balance Medical School and Life',
    description: 'Tips on how to maintain a healthy work-life balance while in medical school.',
    youtubeId: 'vj3_R4tJ334',
    },
    {
    id: '6',
    title: 'The Mindset of a Winner | Kobe Bryant',
    description: 'Kobe Bryant shares his mindset and what it takes to be a winner.',
    youtubeId: '2gO9a8bV5aQ',
    }
];
