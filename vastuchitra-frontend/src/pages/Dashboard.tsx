
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserImages, SavedImage } from '@/services/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [images, setImages] = useState<SavedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getCurrentUser();
        if (!userData) {
          navigate('/login');
          return;
        }
        
        setUser(userData);
        const userImages = await getUserImages();
        setImages(userImages);
      } catch (error) {
        console.error(error);
        toast({
          title: "Authentication Error",
          description: "Please log in again.",
          variant: "destructive"
        });
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);
  
  const handleDownload = (imageUrl: string, id: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `vastuchitra-${id}-architecture.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen pattern-bg flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-terracotta" />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pattern-bg">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-deepblue">Welcome, {user?.name}</h2>
          <div className="flex justify-between items-center mt-2">
            <p className="text-muted-foreground">
              {user?.plan.charAt(0).toUpperCase() + user?.plan.slice(1)} Plan • {user?.imagesRemaining} generations remaining
            </p>
            <Button onClick={() => navigate('/')}>Create New Design</Button>
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-4 border-b border-border pb-2">Your Generated Designs</h3>
          
          {images.length === 0 ? (
            <Card className="bg-muted/40 border-dashed">
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground mb-4">You haven't created any designs yet</p>
                <Button onClick={() => navigate('/')}>Create Your First Design</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={image.imageUrl} 
                        alt="Generated architectural design" 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-3 text-white w-full">
                          <p className="font-medium truncate">{image.style} Style</p>
                          <p className="text-xs opacity-80">
                            {new Date(image.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <p className="text-sm truncate max-w-[70%]">
                        {image.textPrompt || "Sketch-based design"}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDownload(image.imageUrl, image.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
