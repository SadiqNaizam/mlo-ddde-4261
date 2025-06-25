import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Plane, Train, Bus, Car, Mountain, CalendarIcon, ArrowRight, ArrowLeft } from 'lucide-react';

// Define the multi-step form schema using Zod
const formSchema = z.object({
  // Step 1
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  // Step 2
  travelMode: z.enum(["flight", "train", "bus", "cab"]),
  origin: z.string().min(3, { message: "Origin is required." }),
  destination: z.string().min(3, { message: "Destination is required." }),
  travelDate: z.date({ required_error: "A travel date is required." }),
  // Step 3
  cardName: z.string().min(2, { message: "Name on card is required." }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry must be in MM/YY format." }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits." }),
});

const BookingPage = () => {
  console.log('BookingPage loaded');
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      travelMode: "flight",
      origin: "New Delhi", // Placeholder, could be passed from estimator page
      destination: "Mumbai", // Placeholder
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const processForm = (data: z.infer<typeof formSchema>) => {
    console.log("Booking data submitted:", data);
    toast({
      title: "Booking Confirmed!",
      description: "Your trip to India is booked. Check your email for details.",
    });
    setTimeout(() => navigate('/'), 3000); // Redirect to homepage after booking
  };
  
  const nextStep = async () => {
    let fields: any[] = [];
    if (step === 1) fields = ['fullName', 'email', 'phone'];
    if (step === 2) fields = ['travelMode', 'origin', 'destination', 'travelDate'];
    
    const isStepValid = await form.trigger(fields);
    if (isStepValid) {
        setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <Mountain className="h-6 w-6 text-blue-600" />
            <span>India Odyssey Planner</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link to="/packages-listing" className="text-gray-600 hover:text-blue-600 transition-colors">Packages</Link>
            <Link to="/offers" className="text-gray-600 hover:text-blue-600 transition-colors">Offers</Link>
            <Link to="/trip-cost-estimator" className="text-gray-600 hover:text-blue-600 transition-colors">Cost Estimator</Link>
          </nav>
          <Button onClick={() => navigate('/booking')}>Book Now</Button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Finalize Your Journey</CardTitle>
            <CardDescription className="text-center">
              Complete the steps below to confirm your booking. Step {step} of 3.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(processForm)} className="space-y-6">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in-50">
                    <FormField name="fullName" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="e.g., Anjali Sharma" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="email" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input type="email" placeholder="email@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="phone" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input type="tel" placeholder="+91 98765 43210" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}

                {/* Step 2: Travel Details */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in-50">
                    <FormField name="travelMode" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mode of Travel</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a travel mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="flight"><Plane className="inline-block mr-2 h-4 w-4"/>Flight</SelectItem>
                            <SelectItem value="train"><Train className="inline-block mr-2 h-4 w-4"/>Train</SelectItem>
                            <SelectItem value="bus"><Bus className="inline-block mr-2 h-4 w-4"/>Bus</SelectItem>
                            <SelectItem value="cab"><Car className="inline-block mr-2 h-4 w-4"/>Cab</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField name="origin" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>From</FormLabel>
                                <FormControl><Input placeholder="e.g., Delhi" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="destination" control={form.control} render={({ field }) => (
                             <FormItem>
                                <FormLabel>To</FormLabel>
                                <FormControl><Input placeholder="e.g., Mumbai" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <FormField name="travelDate" control={form.control} render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Travel Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date() || date < new Date("1900-01-01")} initialFocus />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )} />
                  </div>
                )}
                
                {/* Step 3: Payment */}
                {step === 3 && (
                   <div className="space-y-4 animate-in fade-in-50">
                     <FormField name="cardName" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl><Input placeholder="Anjali Sharma" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="cardNumber" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl><Input placeholder="1111 2222 3333 4444" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField name="expiryDate" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="cvv" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl><Input placeholder="123" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                   </div>
                )}

                <CardFooter className="flex justify-between p-0 pt-6">
                    {step > 1 && (
                        <Button type="button" variant="outline" onClick={prevStep}>
                            <ArrowLeft className="mr-2 h-4 w-4"/> Previous Step
                        </Button>
                    )}
                    <div className={cn(step === 1 && "w-full")}>
                        {step < 3 && (
                            <Button type="button" onClick={nextStep} className="w-full">
                                Next Step <ArrowRight className="ml-2 h-4 w-4"/>
                            </Button>
                        )}
                        {step === 3 && (
                            <Button type="submit" className="w-full">Confirm & Pay</Button>
                        )}
                    </div>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-2">India Odyssey Planner</h3>
              <p className="text-gray-400 text-sm">Crafting your perfect Indian journey.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/packages-listing" className="text-gray-400 hover:text-white">Packages</Link></li>
                <li><Link to="/offers" className="text-gray-400 hover:text-white">Special Offers</Link></li>
                <li><Link to="/booking" className="text-gray-400 hover:text-white">Book a Trip</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <Separator className="my-6 bg-gray-700" />
          <p className="text-center text-sm text-gray-400">&copy; {new Date().getFullYear()} India Odyssey Planner. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BookingPage;