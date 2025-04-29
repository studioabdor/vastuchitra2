import React from 'react';

const SampleDesigns = () => {
  return (
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
  );
};

export default SampleDesigns;