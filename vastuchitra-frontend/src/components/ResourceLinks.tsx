import React from 'react';
import { Link } from 'react-router-dom';

const ResourceLinks = () => {
  return (
    <div>
      <h3 className="font-medium mb-3">Resources</h3>
      <ul className="space-y-2 text-sm">
        <li>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Documentation
          </a>
        </li>
        <li>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Tutorials
          </a>
        </li>
        <li>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Blog
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ResourceLinks;