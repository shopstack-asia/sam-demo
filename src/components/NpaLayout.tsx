'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Calendar, 
  FileDown, 
  QrCode, 
  Upload, 
  MessageCircle 
} from 'lucide-react';

interface NpaLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { href: '/npa/search', icon: Search, label: 'Search Property' },
  { href: '/npa/appointment', icon: Calendar, label: 'Appointment' },
  { href: '/npa/brochure', icon: FileDown, label: 'Download Brochure' },
  { href: '/npa/payment', icon: QrCode, label: 'QR Payment' },
  { href: '/npa/submit-interest', icon: Upload, label: 'Submit Interest' },
  { href: '/npa/contact', icon: MessageCircle, label: 'Contact' },
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
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sam-text-light rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Online</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Sticky Bottom Rich Menu */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-3 gap-2 p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-sam-secondary text-sam-text-light' 
                    : 'text-sam-primary hover:bg-sam-accent'
                }`}
              >
                <Icon size={20} />
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
