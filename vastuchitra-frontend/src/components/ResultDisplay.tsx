
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';

interface ResultDisplayProps {
  imageUrl: string | null;
  imageId?: string;
  onView?: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageUrl, imageId, onView }) => {
  if (!imageUrl) return null;

  const handleDownload = () => {
    // Create a temporary link
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `vastuchitra-${imageId || 'generated'}-architecture.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Generated Architecture</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onView}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      <Card className="border-2 overflow-hidden">
        <CardContent className="p-0">
          <img 
            src={imageUrl} 
            alt="Generated architectural design" 
            className="w-full h-auto"
          />
        </CardContent>
      </Card>
      
      <p className="text-sm text-muted-foreground">
        AI-generated architectural visualization based on your input.
      </p>
    </div>
  );
};

export default ResultDisplay;
