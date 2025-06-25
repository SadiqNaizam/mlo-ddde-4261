import React from 'react';
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

interface PackageCardProps {
  imageUrl: string;
  title: string;
  summary: string;
  highlights: string[];
}

const PackageCard: React.FC<PackageCardProps> = ({ imageUrl, title, summary, highlights }) => {
  console.log('PackageCard loaded for:', title);

  return (
    <Card className="relative group w-full max-w-sm overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <AspectRatio ratio={4 / 3}>
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
      </AspectRatio>

      {/* Darkening overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

      {/* Text content container */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h3>
        
        {/* Animated container for summary and highlights */}
        <div className="relative h-14 mt-2 overflow-hidden">
          {/* Summary (visible by default, slides up and out on hover) */}
          <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:-translate-y-full">
            <p className="text-sm text-gray-200 line-clamp-2">
              {summary}
            </p>
          </div>
          
          {/* Highlights (hidden by default, slides in from bottom on hover) */}
          <div className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
            <div className="flex flex-wrap gap-2">
              {highlights.map((highlight, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="backdrop-blur-sm bg-white/20 text-white border-none"
                >
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PackageCard;