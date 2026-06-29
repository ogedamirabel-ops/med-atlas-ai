import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockVideos } from '@/lib/mock-videos';

export default function Videos() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Videos & Motivation</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockVideos.map((video) => (
          <Card key={video.id}>
            <CardHeader>
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <CardTitle className="pt-4">{video.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{video.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
