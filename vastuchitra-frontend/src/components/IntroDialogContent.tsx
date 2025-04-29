import React from 'react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface IntroDialogContentProps {
  closeIntroDialog: () => void;
}

const IntroDialogContent: React.FC<IntroDialogContentProps> = ({ closeIntroDialog }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg">
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
    </div>
  );
};

export default IntroDialogContent;