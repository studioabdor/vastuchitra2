
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  textClass?: string;
}

const Logo: React.FC<LogoProps> = ({ className, textClass }) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 100 100" 
          className="text-terracotta"
        >
          <path
            fill="currentColor"
            d="M50 5 L95 30 L95 70 L50 95 L5 70 L5 30 L50 5 Z"
          />
          <path
            fill="#F4E9CD"
            d="M50 15 L85 35 L85 65 L50 85 L15 65 L15 35 L50 15 Z"
          />
          <path
            fill="currentColor"
            d="M50 35 L65 45 L65 65 L50 75 L35 65 L35 45 L50 35 Z"
          />
        </svg>
      </div>
      <div className={cn('font-bold text-2xl tracking-tighter', textClass)}>
        <span className="text-terracotta">Vastu</span>
        <span className="text-deepblue">Chitra</span>
      </div>
    </div>
  );
};

export default Logo;
