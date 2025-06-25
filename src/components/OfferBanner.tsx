import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OfferBannerProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  Icon?: React.ElementType;
}

const OfferBanner: React.FC<OfferBannerProps> = ({
  title = "Exclusive Winter Gateway Deals",
  description = "Discover India's beauty with up to 25% off on select travel packages. Book before it's too late!",
  ctaText = "Explore Offers",
  ctaLink = "/packages-listing",
  Icon = Sparkles,
}) => {
  console.log('OfferBanner loaded');

  return (
    <Card className="relative w-full overflow-hidden rounded-xl border-teal-500/20 bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6 shadow-2xl shadow-teal-500/10 transition-all duration-500 hover:shadow-teal-500/25 md:p-8">
      {/* Subtle background glow element */}
      <div className="absolute -top-1/2 -right-1/4 h-full w-1/2 rounded-full bg-teal-500/10 blur-3xl" />
      
      <div className="relative z-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <Icon className="h-12 w-12 text-teal-400" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
              {title}
            </h2>
            <p className="mt-1 text-sm text-gray-300 md:text-base">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-4 shrink-0 md:mt-0">
          <Button size="lg" asChild className="bg-teal-500 font-semibold text-gray-950 shadow-md transition-all hover:bg-teal-400 hover:shadow-lg hover:scale-105">
            <Link to={ctaLink}>
              {ctaText}
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OfferBanner;