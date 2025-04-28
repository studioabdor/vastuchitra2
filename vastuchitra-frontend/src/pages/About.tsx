
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen pattern-bg">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-deepblue mb-4">About VastuChitra</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Blending ancient architectural wisdom with modern AI technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-deepblue">Our Vision</h3>
            <p className="mb-4">
              VastuChitra was born from a passion for India's rich architectural heritage and a vision to make architectural visualization accessible to everyone.
            </p>
            <p>
              We believe that by combining the principles of traditional design with cutting-edge AI technology, we can help architects, designers, and homeowners visualize their ideas in ways never before possible.
            </p>
          </div>
          <div>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1604871000636-074fa5117945" 
                  alt="Traditional Indian Architecture" 
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1592385253387-b231d93e73d5" 
                  alt="AI and Architecture" 
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-2xl font-bold mb-4 text-deepblue">Our Technology</h3>
            <p className="mb-4">
              VastuChitra leverages advanced AI image generation models specifically fine-tuned on thousands of architectural designs from across India and the world.
            </p>
            <p>
              Our unique approach combines neural networks trained on classical Indian architectural principles with modern computational design methods, creating a harmonious blend of tradition and innovation.
            </p>
          </div>
        </div>
        
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center text-deepblue">Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Aanya Sharma",
                role: "Founder & Architect",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300"
              },
              {
                name: "Rohan Mehta",
                role: "AI Research Lead",
                image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=300"
              },
              {
                name: "Priya Patel",
                role: "Creative Director",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300"
              }
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h4 className="font-bold">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-deepblue">Our Mission</h3>
          <p className="mb-8 max-w-3xl mx-auto">
            To democratize architectural visualization and preserve the rich cultural heritage of Indian architecture 
            while empowering creators to blend traditional designs with modern sensibilities.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
