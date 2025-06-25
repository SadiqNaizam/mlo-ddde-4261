import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mountain } from 'lucide-react';

// --- Reusable Component Definitions (as they are not provided in custom_component_code) ---

// Placeholder Header Component
const Header = () => (
  <header className="px-4 lg:px-6 h-14 flex items-center bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
    <Link to="/" className="flex items-center justify-center">
      <Mountain className="h-6 w-6" />
      <span className="sr-only">India Odyssey Planner</span>
    </Link>
    <nav className="ml-auto flex gap-4 sm:gap-6">
      <Link className="text-sm font-medium hover:underline underline-offset-4" to="/">
        Home
      </Link>
      <Link className="text-sm font-medium hover:underline underline-offset-4" to="/packages-listing">
        Packages
      </Link>
      <Link className="text-sm font-medium text-primary underline underline-offset-4" to="/offers">
        Offers
      </Link>
      <Link className="text-sm font-medium hover:underline underline-offset-4" to="/trip-cost-estimator">
        Trip Estimator
      </Link>
    </nav>
  </header>
);

// Placeholder OfferBanner Component
const OfferBanner = () => (
  <section 
    className="relative w-full h-[400px] bg-cover bg-center text-white flex items-center justify-center"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
  >
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative z-10 text-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Exclusive Off-Season Deals</h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
        Experience the magic of India for less. Unforgettable journeys at unbeatable prices.
      </p>
      <Button size="lg" className="mt-6">Explore Deals</Button>
    </div>
  </section>
);

// Placeholder PackageCard Component
interface PackageCardProps {
  title: string;
  description: string;
  originalPrice: number;
  offerPrice: number;
  imageUrl: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ title, description, originalPrice, offerPrice, imageUrl }) => (
  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-primary">${offerPrice}</span>
        <span className="text-md font-medium text-gray-500 line-through">${originalPrice}</span>
      </div>
    </CardContent>
    <CardFooter>
      <Link to="/booking" className="w-full">
        <Button className="w-full">Book Now</Button>
      </Link>
    </CardFooter>
  </Card>
);

// Placeholder Footer Component
const Footer = () => (
  <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-100">
    <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} India Odyssey Planner. All Rights Reserved.</p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
      <Link className="text-xs hover:underline underline-offset-4" to="#">
        Terms of Service
      </Link>
      <Link className="text-xs hover:underline underline-offset-4" to="#">
        Privacy
      </Link>
    </nav>
  </footer>
);


// --- Main Offers Page Component ---

const specialOffers = [
  {
    title: "Monsoon Magic in Kerala",
    description: "Navigate the serene backwaters of Kerala during the lush monsoon season. Includes houseboat stay.",
    originalPrice: 1200,
    offerPrice: 950,
    imageUrl: "https://images.unsplash.com/photo-1593693397640-053a15c8a245?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Rajasthan's Summer Palaces",
    description: "Explore the majestic forts and palaces of Rajasthan with fewer crowds and special summer rates.",
    originalPrice: 1500,
    offerPrice: 1100,
    imageUrl: "https://images.unsplash.com/photo-1547427523-286d9f7c02b5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Himalayan Summer Retreat",
    description: "Escape the heat with a peaceful retreat in the cool foothills of the Himalayas. Perfect for trekking.",
    originalPrice: 1000,
    offerPrice: 799,
    imageUrl: "https://images.unsplash.com/photo-1588225579934-2244d46849dd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];


const OffersPage = () => {
  console.log('OffersPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <OfferBanner />
        
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
              Our Special Packages
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl text-center mt-4">
              Hand-picked experiences designed to offer you the best of India at an exceptional value.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {specialOffers.map((offer, index) => (
                <PackageCard 
                  key={index}
                  title={offer.title}
                  description={offer.description}
                  originalPrice={offer.originalPrice}
                  offerPrice={offer.offerPrice}
                  imageUrl={offer.imageUrl}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OffersPage;