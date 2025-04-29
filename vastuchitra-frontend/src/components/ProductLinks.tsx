import React from 'react';
import { Link } from 'react-router-dom';

const ProductLinks = () => {
  return (
    <div>
      <h3 className="font-medium mb-3">Product</h3>
      <ul className="space-y-2 text-sm">
        <li>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
        </li>
        <li>
          <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
        </li>
        <li>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            API
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProductLinks;