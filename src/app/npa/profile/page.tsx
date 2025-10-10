'use client';

import NpaLayout from '@/components/NpaLayout';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, User, Edit3, Bookmark, Globe, HelpCircle, LogOut, MessageCircle } from 'lucide-react';

export default function ProfilePage() {
  return (
    <NpaLayout>
      <div className="p-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/npa"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold text-sam-text-primary">My Account</h1>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
          <div className="text-center">
            {/* Profile Picture */}
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mx-auto ring-4 ring-sam-primary ring-opacity-20">
                <Image
                  src="/images/profile-avatar.jpg"
                  alt="Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-sam-primary rounded-full flex items-center justify-center shadow-lg">
                <Edit3 size={16} className="text-white" />
              </div>
            </div>

            {/* User Name */}
            <h2 className="text-2xl font-bold text-sam-text-primary mb-2">Tom Krissana</h2>

            {/* LINE Button */}
            <button className="bg-[#00C300] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 mx-auto hover:bg-[#00A300] transition-colors">
              <MessageCircle size={16} />
              LINE
            </button>
          </div>
        </div>

        {/* Menu Options */}
        <div className="space-y-3">
          {/* Edit Profile */}
          <Link 
            href="/npa/profile/edit"
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <User size={20} className="text-sam-primary" />
            </div>
            <span className="text-sam-text-primary font-medium">Edit Profile</span>
          </Link>

          {/* My Saved Properties */}
          <Link 
            href="/npa/favorites"
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Bookmark size={20} className="text-sam-primary" />
            </div>
            <span className="text-sam-text-primary font-medium">My Saved Properties</span>
          </Link>

          {/* Language */}
          <Link 
            href="/npa/profile/language"
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Globe size={20} className="text-sam-primary" />
            </div>
            <span className="text-sam-text-primary font-medium">Language</span>
          </Link>

          {/* Contact Support */}
          <Link 
            href="/npa/contact"
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <HelpCircle size={20} className="text-sam-primary" />
            </div>
            <span className="text-sam-text-primary font-medium">Contact Support</span>
          </Link>

          {/* Log Out */}
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to log out?')) {
                // Handle logout logic here
                alert('Logged out successfully');
              }
            }}
            className="w-full flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <LogOut size={20} className="text-red-500" />
            </div>
            <span className="text-red-500 font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </NpaLayout>
  );
}
