import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Plane, Train, Hotel, Users, MapPin, CalendarDays, ArrowRight } from 'lucide-react';

// Base costs for calculation
const BASE_COSTS = {
  DESTINATION_SURCHARGE: {
    'golden-triangle': 100,
    'kerala-backwaters': 150,
    'rajasthan-desert': 120,
    'himalayan-adventure': 200,
  },
  ACCOMMODATION_PER_DAY: {
    budget: 30,
    'mid-range': 70,
    luxury: 150,
  },
  SERVICES: {
    flights: 400,
    trains: 150,
    tours: 50, // per day
  },
};

type Destination = 'golden-triangle' | 'kerala-backwaters' | 'rajasthan-desert' | 'himalayan-adventure';
type Accommodation = 'budget' | 'mid-range' | 'luxury';

const TripEstimatorModule: React.FC = () => {
  console.log('TripEstimatorModule loaded');

  // State for user selections
  const [destination, setDestination] = useState<Destination>('golden-triangle');
  const [duration, setDuration] = useState<number[]>([10]);
  const [accommodation, setAccommodation] = useState<Accommodation>('mid-range');
  const [includeFlights, setIncludeFlights] = useState(true);
  const [includeTrains, setIncludeTrains] = useState(false);
  const [includeTours, setIncludeTours] = useState(true);

  // State for the calculated cost
  const [totalCost, setTotalCost] = useState(0);

  const calculateCost = useCallback(() => {
    let cost = 0;
    const days = duration[0];

    // Destination base cost
    cost += BASE_COSTS.DESTINATION_SURCHARGE[destination];

    // Accommodation cost
    cost += BASE_COSTS.ACCOMMODATION_PER_DAY[accommodation] * days;

    // Services cost
    if (includeFlights) {
      cost += BASE_COSTS.SERVICES.flights;
    }
    if (includeTrains) {
      cost += BASE_COSTS.SERVICES.trains;
    }
    if (includeTours) {
      cost += BASE_COSTS.SERVICES.tours * days;
    }

    setTotalCost(cost);
  }, [destination, duration, accommodation, includeFlights, includeTrains, includeTours]);

  useEffect(() => {
    calculateCost();
  }, [calculateCost]);
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Controls */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Customize Your India Odyssey</CardTitle>
              <CardDescription>Adjust the options below to see a real-time cost estimate.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-4">
              {/* Destination */}
              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center text-lg font-medium"><MapPin className="mr-2 h-5 w-5 text-primary" /> Destination</Label>
                <Select value={destination} onValueChange={(value: Destination) => setDestination(value)}>
                  <SelectTrigger id="destination" className="w-full">
                    <SelectValue placeholder="Select a destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="golden-triangle">Golden Triangle (Delhi, Agra, Jaipur)</SelectItem>
                    <SelectItem value="kerala-backwaters">Kerala Backwaters</SelectItem>
                    <SelectItem value="rajasthan-desert">Rajasthan Desert Safari</SelectItem>
                    <SelectItem value="himalayan-adventure">Himalayan Adventure (North India)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Trip Duration */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label htmlFor="duration" className="flex items-center text-lg font-medium"><CalendarDays className="mr-2 h-5 w-5 text-primary" /> Trip Duration</Label>
                    <span className="font-bold text-primary text-lg">{duration[0]} Days</span>
                </div>
                <Slider id="duration" min={3} max={30} step={1} value={duration} onValueChange={setDuration} />
              </div>

              {/* Accommodation Style */}
              <div className="space-y-2">
                <Label htmlFor="accommodation" className="flex items-center text-lg font-medium"><Hotel className="mr-2 h-5 w-5 text-primary" /> Accommodation Style</Label>
                <Select value={accommodation} onValueChange={(value: Accommodation) => setAccommodation(value)}>
                  <SelectTrigger id="accommodation" className="w-full">
                    <SelectValue placeholder="Select accommodation style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget (3-Star & Hostels)</SelectItem>
                    <SelectItem value="mid-range">Mid-Range (4-Star & Boutique)</SelectItem>
                    <SelectItem value="luxury">Luxury (5-Star & Resorts)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Included Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Services</h3>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <Label htmlFor="flights" className="flex items-center text-base"><Plane className="mr-3 h-5 w-5 text-gray-600" /> Include Flights</Label>
                  <Switch id="flights" checked={includeFlights} onCheckedChange={setIncludeFlights} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <Label htmlFor="trains" className="flex items-center text-base"><Train className="mr-3 h-5 w-5 text-gray-600" /> Include Train Travel</Label>
                  <Switch id="trains" checked={includeTrains} onCheckedChange={setIncludeTrains} />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <Label htmlFor="tours" className="flex items-center text-base"><Users className="mr-3 h-5 w-5 text-gray-600" /> Guided Tours</Label>
                  <Switch id="tours" checked={includeTours} onCheckedChange={setIncludeTours} />
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Side: Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-xl">Your Estimated Trip Cost</CardTitle>
              <CardDescription>This is an estimate. Final price may vary.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-5xl font-bold text-primary my-4">
                <span className="text-3xl align-top mr-1">$</span>
                <AnimatedCounter value={totalCost} />
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full text-lg" asChild>
                <Link to="/booking">
                  Finalize & Book
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TripEstimatorModule;