
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import GeneratorForm from '@/components/GeneratorForm';
import ResultDisplay from '@/components/ResultDisplay';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedImageId, setGeneratedImageId] = useState<string | undefined>(undefined);
  const [showIntroDialog, setShowIntroDialog] = useState(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    return !hasSeenIntro;
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageGenerated = (imageUrl: string, id?: string) => {
    setGeneratedImage(imageUrl);
    setGeneratedImageId(id);
  };

  const handleViewImage = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      toast({
        title: "Sign in required",
        description: "Please log in to view your saved designs",
      });
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  const closeIntroDialog = () => {
    setShowIntroDialog(false);
    localStorage.setItem('hasSeenIntro', 'true');
  };

  return (
    <div className="min-h-screen pattern-bg">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 md:mb-16">
          <Logo className="mx-auto" />
          <h1 className="mt-6 text-center text-3xl md:text-4xl font-bold text-deepblue">
            Transform Your Architectural Sketches
          </h1>
          <p className="mt-3 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your architectural sketch or describe your vision, and choose a cultural style 
            to generate beautiful, culturally-inspired architectural visualizations with AI.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Form */}
          <div className="space-y-8">
            <GeneratorForm onImageGenerated={handleImageGenerated} />
          </div>

          {/* Right Column - Result or Samples */}
          <div>
            {generatedImage ? (
              <ResultDisplay 
                imageUrl={generatedImage} 
                imageId={generatedImageId}
                onView={handleViewImage}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-24 h-24 mb-6 rounded-full bg-terracotta/20 flex items-center justify-center">
                  <svg 
                    className="w-12 h-12 text-terracotta" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M2 9.5V4a2 2 0 0 1 2-2h3.5" />
                    <path d="M2 14.5V20a2 2 0 0 0 2 2h3.5" />
                    <path d="M22 14.5V20a2 2 0 0 1-2 2h-3.5" />
                    <path d="M22 9.5V4a2 2 0 0 0-2-2h-3.5" />
                    <rect width="6" height="6" x="9" y="9" rx="1" />
                    <path d="M12 14v3" />
                    <path d="M12 7v3" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Your design will appear here</h3>
                <p className="text-muted-foreground mb-4">
                  Upload a sketch or describe your vision and select a style to see the AI-generated architectural visualization.
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  {["Mughal domes and arches", "Kerala sloped roofs", "Rajasthani ornate facades", "Contemporary fusion"].map((style, index) => (
                    <div key={index} className="bg-white/50 p-3 rounded-md text-sm border border-border">
                      {style}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />

      {/* Introduction Dialog */}
      <Dialog open={showIntroDialog} onOpenChange={setShowIntroDialog}>
        <DialogContent className="max-w-lg">
          <div className="text-center mb-4">
            <Logo className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-deepblue">Welcome to VastuChitra</h2>
            <p className="text-muted-foreground mt-2">
              The AI-powered architectural visualization platform
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-medium mb-2">How it works:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Upload an architectural sketch or describe your vision</li>
                <li>Choose from traditional Indian or international architectural styles</li>
                <li>Click generate to create an AI visualization of your design</li>
                <li>View, download, or save your generated images</li>
              </ol>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Sign up for a free account to save your designs and unlock more features!
            </p>
          </div>
          
          <div className="flex gap-3 justify-center mt-4">
            <Button variant="outline" onClick={closeIntroDialog}>
              Continue as Guest
            </Button>
            <Button onClick={() => {
              closeIntroDialog();
              navigate('/register');
            }}>
              Create Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
