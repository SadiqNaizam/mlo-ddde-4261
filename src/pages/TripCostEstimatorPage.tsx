import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CountUp from 'react-countup';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plane, Hotel, Train, Mountain, Sun, Waves, Leaf } from 'lucide-react';

// --- Reusable Header Component for consistent navigation ---
const Header = () => (
  <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
    <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center">
        <Leaf className="h-6 w-6 mr-2 text-green-600" />
        India Odyssey Planner
      </Link>
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-gray-600 hover:text-green-700 transition-colors">Home</Link>
        <Link to="/packages-listing" className="text-gray-600 hover:text-green-700 transition-colors">Packages</Link>
        <Link to="/offers" className="text-gray-600 hover:text-green-700 transition-colors">Offers</Link>
        <Link to="/trip-cost-estimator" className="text-green-700 font-semibold border-b-2 border-green-700 pb-1">Cost Estimator</Link>
      </div>
       <Button variant="outline" className="hidden md:block">Contact Us</Button>
    </nav>
  </header>
);

// --- Reusable Footer Component ---
const Footer = () => (
  <footer className="bg-gray-100 border-t mt-12">
    <div className="container mx-auto px-6 py-8 text-center text-gray-600">
      <p>&copy; {new Date().getFullYear()} India Odyssey Planner. All rights reserved.</p>
      <p className="text-sm mt-2">Crafting unforgettable journeys across India.</p>
    </div>
  </footer>
);


// --- Main Page Component ---
const TripCostEstimatorPage = () => {
  console.log('TripCostEstimatorPage loaded');
  const navigate = useNavigate();

  // --- State for Estimator Options ---
  const [destination, setDestination] = useState('kerala');
  const [duration, setDuration] = useState([10]);
  const [includeFlights, setIncludeFlights] = useState(true);
  const [includeHotel, setIncludeHotel] = useState(true);
  const [includeTrain, setIncludeTrain] = useState(false);
  const [hotelTier, setHotelTier] = useState('4star');
  const [totalCost, setTotalCost] = useState(0);

  const prevCostRef = useRef(0);

  // --- Cost Calculation Logic ---
  useEffect(() => {
    prevCostRef.current = totalCost;

    let newCost = 0;
    const tripDuration = duration[0];

    // Base cost per destination
    const destinationCosts = { kerala: 15000, goa: 12000, rajasthan: 18000 };
    newCost += destinationCosts[destination] || 0;

    // Daily cost for duration
    newCost += tripDuration * 2000;

    // Flight cost
    if (includeFlights) {
      newCost += 12000;
    }

    // Hotel cost
    if (includeHotel) {
      const hotelTierCosts = { '3star': 2500, '4star': 4000, '5star': 7500 };
      newCost += (hotelTierCosts[hotelTier] || 0) * tripDuration;
    }

    // Train travel cost
    if (includeTrain) {
      newCost += 5000;
    }

    setTotalCost(newCost);
  }, [destination, duration, includeFlights, includeHotel, includeTrain, hotelTier]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">Craft Your Perfect India Trip</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Use our interactive tool to build your dream itinerary and see the estimated cost in real-time.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* --- TripEstimatorModule --- */}
          <div className="lg:w-2/3">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Customize Your Journey</CardTitle>
                <CardDescription>Select your preferences to get a cost estimate.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-4">
                {/* Destination */}
                <div>
                  <Label htmlFor="destination" className="text-lg font-medium">Destination</Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger id="destination" className="mt-2 text-base py-6">
                      <SelectValue placeholder="Select a destination..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kerala"><div className="flex items-center"><Waves className="h-4 w-4 mr-2" />Kerala Backwaters</div></SelectItem>
                      <SelectItem value="goa"><div className="flex items-center"><Sun className="h-4 w-4 mr-2" />Goa Beaches</div></SelectItem>
                      <SelectItem value="rajasthan"><div className="flex items-center"><Mountain className="h-4 w-4 mr-2" />Rajasthan Forts</div></SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration */}
                <div>
                  <Label htmlFor="duration" className="text-lg font-medium">Trip Duration: {duration[0]} days</Label>
                  <Slider
                    id="duration"
                    min={3}
                    max={30}
                    step={1}
                    value={duration}
                    onValueChange={setDuration}
                    className="mt-3"
                  />
                </div>

                {/* Toggles for Services */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <Plane className="h-6 w-6 text-blue-500"/>
                        <Label htmlFor="flights" className="flex-grow font-medium">Include Flights</Label>
                        <Switch id="flights" checked={includeFlights} onCheckedChange={setIncludeFlights} />
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <Hotel className="h-6 w-6 text-purple-500"/>
                        <Label htmlFor="hotel" className="flex-grow font-medium">Include Hotel</Label>
                        <Switch id="hotel" checked={includeHotel} onCheckedChange={setIncludeHotel} />
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <Train className="h-6 w-6 text-red-500"/>
                        <Label htmlFor="train" className="flex-grow font-medium">Train Travel</Label>
                        <Switch id="train" checked={includeTrain} onCheckedChange={setIncludeTrain} />
                    </div>
                </div>

                {/* Hotel Tier */}
                {includeHotel && (
                  <div>
                    <Label htmlFor="hotel-tier" className="text-lg font-medium">Hotel Tier</Label>
                    <Select value={hotelTier} onValueChange={setHotelTier}>
                      <SelectTrigger id="hotel-tier" className="mt-2 text-base py-6">
                        <SelectValue placeholder="Select hotel preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3star">3-Star (Comfort)</SelectItem>
                        <SelectItem value="4star">4-Star (Premium)</SelectItem>
                        <SelectItem value="5star">5-Star (Luxury)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* --- AnimatedCounter and Booking Button --- */}
          <div className="lg:w-1/3">
            <Card className="shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl text-gray-700">Estimated Trip Cost</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-5xl font-bold text-green-700">
                  <CountUp
                    start={prevCostRef.current}
                    end={totalCost}
                    duration={1.5}
                    separator=","
                    prefix="₹"
                  />
                </p>
                <p className="text-sm text-gray-500 mt-2">per person (approx.)</p>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full text-lg" onClick={() => navigate('/booking')}>
                  Finalize & Book
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TripCostEstimatorPage;