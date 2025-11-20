'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  Calculator,
  FileText,
  MapPin,
  Phone
} from 'lucide-react';

interface NplLayoutProps {
  children: React.ReactNode;
  hideFooterMenu?: boolean;
}

const menuItems = [
  { href: '/npl/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/npl/debt-calculator', icon: Calculator, label: 'Calculator' },
  { href: '/npl/document-management', icon: FileText, label: 'Documents' },
  { href: '/npl/branches', icon: MapPin, label: 'Branches' },
  { href: '/npl/contact', icon: Phone, label: 'Contact' },
];

export default function NplLayout({ children, hideFooterMenu = false }: NplLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-sam-accent">
        {/* Header */}
        <header className="bg-gradient-to-r from-sam-primary to-sam-secondary text-sam-text-light px-4 py-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/npl" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
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
              <span className="text-xl font-bold leading-tight">SAM NPL</span>
              <span className="text-xs opacity-90">Non-Performing Loan</span>
            </div>
          </Link>
          <Link 
            href="/npl/profile" 
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="relative">
              <Image
                src="/images/profile-avatar.jpg"
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full border-2 border-white shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Rich Menu */}
      {!hideFooterMenu && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
          <div className="grid grid-cols-5 gap-1 p-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors duration-200
                    ${isActive ? 'text-sam-secondary' : 'text-sam-primary'}
                    hover:text-sam-secondary`}
                >
                  <Icon size={20} className="mb-1" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
