'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Home, 
  Search, 
  Gavel, 
  Heart, 
  User,
  MessageCircle
} from 'lucide-react';

interface NpaLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { href: '/npa', icon: Home, label: 'Home' },
  { href: '/npa/search', icon: Search, label: 'Browse' },
    { href: '/npa/auction', icon: Gavel, label: 'Auction' },
    { href: '/npa/favorites', icon: Heart, label: 'Favorites' },
    { href: '/npa/profile', icon: User, label: 'Profile' },
];

export default function NpaLayout({ children }: NpaLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-sam-accent">
      {/* Header */}
      <header className="bg-gradient-to-r from-sam-primary to-sam-secondary text-sam-text-light px-4 py-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/npa" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="relative">
              <Image
                src="/sam_logo.png"
                alt="SAM Logo"
                width={70}
                height={40}
                className="rounded-lg shadow-lg brightness-110 contrast-125"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-sam-secondary rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-tight">SAM NPA</span>
              <span className="text-xs opacity-90">Non-Performing Asset</span>
            </div>
          </Link>
          <Link
            href="/npa/contact"
            className="flex items-center justify-center text-sam-text-light w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 drop-shadow-2xl hover:drop-shadow-2xl"
          >
            <MessageCircle size={24} />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Sticky Bottom Rich Menu */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center p-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ease-in-out transform ${
                  isActive 
                    ? 'text-sam-primary' 
                    : 'text-sam-primary hover:bg-sam-accent hover:scale-105'
                }`}
              >
                <div className={`transition-all duration-200 ${
                  isActive 
                    ? 'drop-shadow-2xl' 
                    : ''
                }`}>
                  <Icon size={22} />
                </div>
                <span className="text-xs mt-1 text-center leading-tight">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
