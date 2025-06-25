import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Mountain, Plane, Hotel, Sailboat, MapPin } from 'lucide-react';

// Placeholder data for travel packages
const packagesData = [
  {
    id: 1,
    title: 'The Golden Triangle',
    destination: 'North India',
    price: 1200,
    duration: '7 Days',
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop',
    description: 'Experience the iconic trio of Delhi, Agra, and Jaipur. Witness the Taj Mahal and explore rich Mughal history.',
    type: 'cultural',
  },
  {
    id: 2,
    title: 'Kerala Backwaters Escape',
    destination: 'South India',
    price: 950,
    duration: '5 Days',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1935&auto=format&fit=crop',
    description: 'Relax on a traditional houseboat as you drift through serene backwaters and lush green landscapes.',
    type: 'relax',
  },
  {
    id: 3,
    title: 'Himalayan Adventure',
    destination: 'North India',
    price: 2500,
    duration: '14 Days',
    imageUrl: 'https://images.unsplash.com/photo-1616423833230-877f74a117b3?q=80&w=1939&auto=format&fit=crop',
    description: 'A thrilling trek through the majestic Himalayas, offering breathtaking views and challenging trails.',
    type: 'adventure',
  },
  {
    id: 4,
    title: 'Beaches of Goa',
    destination: 'West India',
    price: 700,
    duration: '6 Days',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop',
    description: 'Enjoy the sun, sand, and sea on the vibrant beaches of Goa. Perfect for a relaxing getaway.',
    type: 'relax',
  },
    {
    id: 5,
    title: 'Rajasthan Royal Tour',
    destination: 'West India',
    price: 1800,
    duration: '10 Days',
    imageUrl: 'https://images.unsplash.com/photo-1603290983411-9bf6a8a335a9?q=80&w=1974&auto=format&fit=crop',
    description: 'Explore the majestic forts and palaces of Rajasthan and experience the life of Indian royalty.',
    type: 'cultural',
  },
  {
    id: 6,
    title: 'Rishikesh Yoga Retreat',
    destination: 'North India',
    price: 1100,
    duration: '7 Days',
    imageUrl: 'https://images.unsplash.com/photo-1596700699499-7347517614a5?q=80&w=1974&auto=format&fit=crop',
    description: 'Find your inner peace with a yoga and meditation retreat in the spiritual heart of India.',
    type: 'adventure',
  },
];

const PackageCard = ({ pkg }: { pkg: typeof packagesData[0] }) => (
  <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
    <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-48 object-cover" />
    <CardHeader>
      <CardTitle>{pkg.title}</CardTitle>
      <CardDescription className="flex items-center pt-1">
        <MapPin className="h-4 w-4 mr-1" /> {pkg.destination}
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-sm text-muted-foreground">{pkg.description}</p>
    </CardContent>
    <CardFooter className="flex justify-between items-center bg-gray-50 p-4">
      <div>
        <p className="text-lg font-bold">${pkg.price}</p>
        <p className="text-sm text-muted-foreground">{pkg.duration}</p>
      </div>
      <Link to="/booking">
        <Button>Book Now</Button>
      </Link>
    </CardFooter>
  </Card>
);


const PackagesListingPage = () => {
    console.log('PackagesListingPage loaded');
    const [priceRange, setPriceRange] = useState([500, 3000]);

    return (
        <div className="min-h-screen bg-stone-50 text-stone-800">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center text-2xl font-bold text-stone-900">
                            <Mountain className="h-6 w-6 mr-2" />
                            India Odyssey
                        </Link>
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link to="/" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Home</Link>
                            <Link to="/packages-listing" className="text-sm font-medium text-stone-900 border-b-2 border-stone-900">Packages</Link>
                            <Link to="/offers" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Offers</Link>
                            <Link to="/trip-cost-estimator" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Estimator</Link>
                        </nav>
                        <Link to="/booking">
                          <Button>Book a Trip</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-extrabold text-center mb-4">Explore Our Packages</h1>
                <p className="text-lg text-muted-foreground text-center mb-12">Find the perfect journey curated just for you.</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <aside className="lg:col-span-1">
                        <Card className="sticky top-24 p-6 shadow-md">
                            <h3 className="text-xl font-semibold mb-6">Filter Your Trip</h3>
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="destination">Destination</Label>
                                    <Select>
                                        <SelectTrigger id="destination">
                                            <SelectValue placeholder="All India" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All India</SelectItem>
                                            <SelectItem value="north">North India</SelectItem>
                                            <SelectItem value="south">South India</SelectItem>
                                            <SelectItem value="west">West India</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Price Range</Label>
                                    <Slider
                                        defaultValue={[500, 3000]}
                                        max={5000}
                                        min={0}
                                        step={100}
                                        value={priceRange}
                                        onValueChange={setPriceRange}
                                        className="mt-2"
                                    />
                                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                </div>
                                <div>
                                    <Label>Travel Style</Label>
                                    <div className="space-y-2 mt-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="cultural" />
                                            <label htmlFor="cultural" className="text-sm font-medium leading-none">Cultural</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="adventure" />
                                            <label htmlFor="adventure" className="text-sm font-medium leading-none">Adventure</label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="relax" />
                                            <label htmlFor="relax" className="text-sm font-medium leading-none">Relaxation</label>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full">Apply Filters</Button>
                            </div>
                        </Card>
                    </aside>

                    {/* Packages Grid */}
                    <section className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {packagesData.map(pkg => (
                                <PackageCard key={pkg.id} pkg={pkg} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12">
                             <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive>1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">2</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-stone-800 text-stone-300 mt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-white">India Odyssey</h3>
                            <p className="mt-2 text-sm">Your journey through incredible India begins here.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                            <ul className="mt-4 space-y-2">
                                <li><Link to="/packages-listing" className="text-sm hover:text-white transition-colors">Packages</Link></li>
                                <li><Link to="/offers" className="text-sm hover:text-white transition-colors">Special Offers</Link></li>
                                <li><Link to="/booking" className="text-sm hover:text-white transition-colors">Book Now</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Inclusions</h3>
                            <div className="mt-4 space-y-2 text-sm">
                                <p className="flex items-center"><Plane className="h-4 w-4 mr-2" /> Flights</p>
                                <p className="flex items-center"><Hotel className="h-4 w-4 mr-2" /> Hotels</p>
                                <p className="flex items-center"><Sailboat className="h-4 w-4 mr-2" /> Activities</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                            <p className="mt-4 text-sm">support@indiaodyssey.com</p>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-stone-700 pt-8 text-center text-sm">
                        <p>&copy; {new Date().getFullYear()} India Odyssey Planner. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PackagesListingPage;