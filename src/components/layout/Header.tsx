import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Map, Menu } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
    }`;

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/packages-listing', label: 'Packages' },
    { to: '/offers', label: 'Offers' },
    { to: '/trip-cost-estimator', label: 'Trip Cost Estimator' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 mr-6">
          <Map className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline-block">India Odyssey Planner</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost">Login</Button>
            <Button>Register</Button>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                   <Map className="h-6 w-6 text-primary" />
                   <span>India Odyssey Planner</span>
                </Link>
                {navItems.map((item) => (
                   <NavLink key={item.to} to={item.to} className="text-muted-foreground hover:text-foreground">
                    {item.label}
                   </NavLink>
                ))}
                <div className="flex flex-col gap-4 pt-6">
                  <Button variant="ghost">Login</Button>
                  <Button>Register</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;