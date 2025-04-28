
import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import StyleSelector from '@/components/StyleSelector';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GenerationRequest, generateImage } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface GeneratorFormProps {
  onImageGenerated: (imageUrl: string, id?: string) => void;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ onImageGenerated }) => {
  const [file, setFile] = useState<File | null>(null);
  const [style, setStyle] = useState("mughal");
  const [textPrompt, setTextPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generationMethod, setGenerationMethod] = useState<"sketch" | "text">("sketch");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (generationMethod === "sketch" && !file) {
      toast({
        title: "Missing sketch",
        description: "Please upload a sketch before generating",
        variant: "destructive"
      });
      return;
    }

    if (generationMethod === "text" && !textPrompt.trim()) {
      toast({
        title: "Missing text prompt",
        description: "Please enter a description before generating",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      const request: GenerationRequest = {
        sketch: file || new File([], "placeholder.jpg"), // Placeholder for text-only
        style,
        textPrompt: generationMethod === "text" ? textPrompt : undefined
      };
      
      const response = await generateImage(request);
      
      if (response.status === 'success') {
        onImageGenerated(response.imageUrl, response.id);
        toast({
          title: "Image generated!",
          description: "Your architectural design has been created."
        });
      } else {
        toast({
          title: "Generation failed",
          description: "There was an error generating your image.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs 
        defaultValue="sketch" 
        className="w-full"
        onValueChange={(val) => setGenerationMethod(val as "sketch" | "text")}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sketch">Sketch to Image</TabsTrigger>
          <TabsTrigger value="text">Text to Image</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sketch" className="space-y-4 mt-4">
          <Card className="border-2">
            <CardContent className="pt-6">
              <FileUpload onFileSelected={setFile} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="text" className="space-y-4 mt-4">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Describe your architectural vision</label>
                <Textarea 
                  placeholder="E.g., A two-story house with a sloped roof, large windows, and a central courtyard" 
                  value={textPrompt}
                  onChange={(e) => setTextPrompt(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Be specific about architectural elements, materials, and style preferences
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="space-y-3">
        <label className="text-sm font-medium">
          Select architectural style
        </label>
        <StyleSelector value={style} onValueChange={setStyle} />
      </div>
      
      <Button 
        type="submit" 
        className="w-full py-6" 
        disabled={isLoading || (generationMethod === "sketch" && !file) || (generationMethod === "text" && !textPrompt.trim())}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Architecture"
        )}
      </Button>
    </form>
  );
};

export default GeneratorForm;
