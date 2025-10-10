'use client';

import { useState } from 'react';
import NpaLayout from '@/components/NpaLayout';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Camera, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    name: 'Tom Krissana',
    email: 'tom.krissana@example.com',
    phone: '0812345678',
    address: '123 Sukhumvit Road, Bangkok 10110',
    birthDate: '1990-05-15',
    occupation: 'Software Engineer',
    company: 'Tech Company Ltd.'
  });

  // const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Mock save functionality
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Mock cancel functionality
  };

  return (
    <NpaLayout>
      <div className="p-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/npa/profile"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold text-sam-text-primary">Edit Profile</h1>
        </div>

        {/* Profile Picture Section */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
          <div className="text-center">
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
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-sam-primary rounded-full flex items-center justify-center hover:bg-[#005a42] transition-colors shadow-lg">
                <Camera size={16} className="text-white" />
              </button>
            </div>
            <p className="text-sm text-gray-600">Tap to change profile picture</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="space-y-4">
          {/* Name */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-sam-text-primary mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-sam-text-primary mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-sam-text-primary mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-sam-text-primary mb-2">
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-4 text-gray-400" size={20} />
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent resize-none"
                rows={3}
                placeholder="Enter your address"
              />
            </div>
          </div>

          {/* Birth Date */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-sam-text-primary mb-2">
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Occupation */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-sam-text-primary mb-2">
              Occupation
            </label>
            <input
              type="text"
              value={formData.occupation}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
              placeholder="Enter your occupation"
            />
          </div>

          {/* Company */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-sam-text-primary mb-2">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
              placeholder="Enter your company name"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="w-full px-4 py-3 bg-sam-primary text-white rounded-lg hover:bg-[#005a42] transition-colors font-medium"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="w-full mt-3 text-gray-600 hover:text-gray-800 transition-colors text-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </NpaLayout>
  );
}
