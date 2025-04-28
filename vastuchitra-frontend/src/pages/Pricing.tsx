
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  highlighted = false,
  ctaText = "Get Started" 
}: { 
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
}) => (
  <Card className={`flex flex-col h-full ${highlighted ? 'border-primary shadow-lg' : ''}`}>
    <CardHeader>
      <CardTitle className="text-xl">{name}</CardTitle>
      <div className="mt-4 flex items-baseline text-5xl font-extrabold">
        {price}
        {price !== "Free" && <span className="ml-1 text-2xl font-medium text-gray-500">/mo</span>}
      </div>
      <CardDescription className="mt-4">{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex">
            <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
            <span className="ml-3 text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter className="pt-4">
      <Button variant={highlighted ? "default" : "outline"} className="w-full">
        {ctaText}
      </Button>
    </CardFooter>
  </Card>
);

const Pricing = () => {
  return (
    <div className="min-h-screen pattern-bg">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-deepblue mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan that suits your architectural visualization needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingTier
            name="Basic"
            price="Free"
            description="Perfect for trying out VastuChitra's capabilities"
            features={[
              "5 Generations per month",
              "Sketch-to-image conversion",
              "Basic architectural styles",
              "24-hour support",
              "Standard resolution"
            ]}
            ctaText="Start Free"
          />
          
          <PricingTier
            name="Professional"
            price="₹999"
            description="For architects and designers who need more power"
            features={[
              "50 Generations per month",
              "Sketch-to-image conversion",
              "Text-to-image generation",
              "All architectural styles",
              "High resolution outputs",
              "Priority support"
            ]}
            highlighted={true}
            ctaText="Upgrade Now"
          />
          
          <PricingTier
            name="Enterprise"
            price="₹2499"
            description="For studios and companies with advanced needs"
            features={[
              "Unlimited generations",
              "All generation features",
              "Custom architectural styles",
              "Highest resolution outputs",
              "API access",
              "24/7 dedicated support",
              "White labeling options"
            ]}
            ctaText="Contact Sales"
          />
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-4">Need a custom plan?</h3>
          <p className="text-muted-foreground mb-6">
            Contact our team for custom solutions tailored to your specific requirements
          </p>
          <Button variant="outline">Contact Us</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
