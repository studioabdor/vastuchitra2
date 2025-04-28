
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected, className }) => {
  const [preview, setPreview] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onFileSelected(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onFileSelected]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1
  });
  
  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50",
          preview ? "border-primary" : "",
          "group"
        )}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="w-full flex flex-col items-center">
            <div className="max-h-64 overflow-hidden rounded-md mb-4">
              <img src={preview} alt="Preview" className="object-contain max-h-64" />
            </div>
            <p className="text-sm text-muted-foreground">Click or drag to replace</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <ImageIcon className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
            </div>
            <p className="text-lg font-medium mb-1">Upload your sketch</p>
            <p className="text-sm text-muted-foreground mb-2 text-center">
              Drag and drop or click to upload your architectural sketch
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG or JPEG (max. 5MB)
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
