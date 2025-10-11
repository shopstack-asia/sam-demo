'use client';

import NplLayout from '@/components/NplLayout';
import { ArrowLeft, Edit, Phone, Mail, MapPin, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
  const mockUser = {
    name: "Somrak Thawan",
    email: "somrak.thawan@email.com",
    phone: "+66 81-234-5678",
    address: "123 Sukhumvit Road, Bangkok 10110",
    dateOfBirth: "1985-03-15",
    customerId: "NPL-2024-001234",
    memberSince: "2020-01-15",
    avatar: "/images/profile-avatar.jpg"
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <NplLayout>
      <div className="p-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/npl/dashboard"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold text-sam-text-primary">My Profile</h1>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Image
                src={mockUser.avatar}
                alt="Profile Avatar"
                width={80}
                height={80}
                className="rounded-full border-4 border-sam-primary shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-4 border-white"></div>
            </div>
            <div className="flex-1">
              <h1 className="font-bold text-sam-text-primary mb-1">
                {mockUser.name}
              </h1>
              <p className="text-sm text-gray-500 mb-2"><span className="font-bold">Customer ID:</span><br/>{mockUser.customerId}</p>
              <p className="text-sm text-gray-500 mb-4"><span className="font-bold">Member since:</span><br/> {formatDate(mockUser.memberSince)}</p>
              <Link
                href="/npl/profile/edit"
                className="bg-sam-primary hover:bg-[#005a42] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2 w-full justify-center"
              >
                <Edit size={16} />
                <span>Edit</span>
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-sam-primary" size={20} />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-sam-text-primary">{mockUser.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-sam-primary" size={20} />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-sam-text-primary">{mockUser.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-sam-primary" size={20} />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium text-sam-text-primary">{mockUser.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-sam-primary" size={20} />
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-medium text-sam-text-primary">{formatDate(mockUser.dateOfBirth)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-semibold text-sam-text-primary mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/npl/document-management"
              className="flex items-center gap-3 p-3 bg-sam-accent rounded-lg hover:bg-gray-100 transition-colors"
            >
              <User className="text-sam-primary" size={20} />
              <span className="font-medium">My Documents</span>
            </Link>
            
            <Link
              href="/npl/contact"
              className="flex items-center gap-3 p-3 bg-sam-accent rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="text-sam-primary" size={20} />
              <span className="font-medium">Contact Support</span>
            </Link>
          </div>
        </div>
      </div>
    </NplLayout>
  );
}
