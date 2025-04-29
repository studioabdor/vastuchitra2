import React from 'react';
import { Link } from 'react-router-dom';

const CompanyLinks = () => {
  return (
    <div>
      <h3 className="font-medium mb-3">Company</h3>
      <ul className="space-y-2 text-sm">
        <li>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </li>
        <li>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </li>
        <li>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CompanyLinks;