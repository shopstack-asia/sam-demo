'use client';

import NplLayout from '@/components/NplLayout';
import Link from 'next/link';
import Image from 'next/image';
import { LogIn, Eye, ArrowRight } from 'lucide-react';

export default function NplPage() {
  return (
    <NplLayout>
      <div className="p-4">
        {/* Hero Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-md text-center">
          <div className="mb-4">
            <Image
              src="/images/npl-dashboard.jpg"
              alt="NPL Dashboard"
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg mx-auto"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-sam-text-primary mb-2">
            NPL (Non-Performing Loan)
          </h1>
          <p className="text-gray-600 mb-6">
            Manage your debt status and make payments
          </p>
          
          <div className="space-y-3">
            <Link
              href="/npl/login"
              className="w-full bg-sam-primary hover:bg-[#005a42] text-sam-text-light font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              <span>Login / Verify ID</span>
            </Link>
            
            <Link
              href="/npl/dashboard"
              className="w-full border border-sam-primary text-sam-primary font-medium py-3 px-4 rounded-lg hover:bg-sam-primary hover:text-white transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Eye size={20} />
              <span>View Demo Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <h3 className="font-semibold text-sam-text-primary mb-3">
            NPL Features
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sam-primary rounded-full"></div>
              <span>Check debt balance and payment history</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sam-primary rounded-full"></div>
              <span>Calculate installment plans</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sam-primary rounded-full"></div>
              <span>Upload and manage documents</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sam-primary rounded-full"></div>
              <span>Find branch locations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sam-primary rounded-full"></div>
              <span>Contact support team</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-semibold text-sam-text-primary mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/npl/register"
              className="flex items-center justify-center gap-2 bg-sam-secondary hover:bg-[#008f6f] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <ArrowRight size={16} />
              <span>Register</span>
            </Link>
            <Link
              href="/npl/contact"
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <ArrowRight size={16} />
              <span>Get Help</span>
            </Link>
          </div>
        </div>
      </div>
    </NplLayout>
  );
}
