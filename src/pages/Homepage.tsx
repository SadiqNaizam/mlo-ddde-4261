import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plane, Hotel, Star, MapPin } from 'lucide-react';

// Placeholder data for featured packages
const featuredPackages = [
  {
    id: 1,
    title: 'The Golden Triangle',
    location: 'Delhi, Agra, Jaipur',
    duration: '7 Days',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1599661046227-1f481b4a4559?q=80&w=1935&auto=format&fit=crop',
    description: 'Experience the rich history and vibrant culture of India’s most famous circuit.',
  },
  {
    id: 2,
    title: 'Kerala Backwater Bliss',
    location: 'Kochi, Alleppey, Munnar',
    duration: '10 Days',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop',
    description: 'Cruise through serene backwaters and explore the lush, green landscapes of "God\'s Own Country".',
  },
  {
    id: 3,
    title: 'Spiritual Varanasi & Ganges',
    location: 'Varanasi, Sarnath',
    duration: '5 Days',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1582512422748-18c7c102b48d?q=80&w=2070&auto=format&fit=crop',
    description: 'Witness ancient rituals on the banks of the sacred Ganges river in the spiritual heart of India.',
  },
];

const Homepage = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            India Odyssey Planner
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/packages-listing" className="text-gray-600 hover:text-blue-600 transition-colors">
              Packages
            </Link>
            <Link to="/offers" className="text-gray-600 hover:text-blue-600 transition-colors">
              Offers
            </Link>
            <Link to="/trip-cost-estimator" className="text-gray-600 hover:text-blue-600 transition-colors">
              Trip Cost Estimator
            </Link>
            <Link to="/booking">
              <Button>Book Now</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          className="relative h-[65vh] bg-cover bg-center flex items-center justify-center text-center text-white"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 max-w-2xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">Discover Your India</h1>
            <p className="text-lg md:text-xl mb-8 font-light">
              Craft your perfect journey through the vibrant landscapes and timeless cultures of India.
            </p>
            <div className="flex max-w-lg mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search destinations, e.g., 'Jaipur'"
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button type="submit" size="lg" className="ml-2 h-12">
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Packages Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Featured Travel Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
                  <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <CardHeader>
                    <CardTitle className="text-xl">{pkg.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500 pt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {pkg.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <div className="flex justify-between items-center text-sm mb-4">
                        <span className="font-medium">{pkg.duration}</span>
                        <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                            <span className="font-bold">{pkg.rating}</span>
                        </div>
                    </div>
                    <Link to="/packages-listing">
                        <Button className="w-full">View Details</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Offer Banner Section */}
        <section className="bg-blue-600 text-white">
            <div className="container mx-auto px-4 py-12 text-center">
                <h3 className="text-3xl font-bold mb-2">Special Monsoon Offer</h3>
                <p className="text-lg mb-6">Get up to 20% off on all packages booked this season. Explore India in its most vibrant avatar!</p>
                <Link to="/offers">
                    <Button variant="secondary" size="lg">Explore Offers</Button>
                </Link>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} India Odyssey Planner. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4 mt-4 text-sm">
            <Link to="/packages-listing" className="hover:text-white">Packages</Link>
            <Link to="/offers" className="hover:text-white">Offers</Link>
            <Link to="/trip-cost-estimator" className="hover:text-white">Cost Estimator</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;