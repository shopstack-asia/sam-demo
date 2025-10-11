'use client';

import NplLayout from '@/components/NplLayout';
import { ArrowLeft, Save, X, Camera, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    name: "Somrak Thawan",
    email: "somrak.thawan@email.com",
    phone: "+66 81-234-5678",
    address: "123 Sukhumvit Road, Bangkok 10110",
    dateOfBirth: "1985-03-15",
    occupation: "Business Owner",
    company: "Thawan Trading Co., Ltd.",
    avatar: "/images/profile-avatar.jpg"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving profile:', formData);
    // In real app, this would save to backend
    alert('Profile updated successfully!');
  };

  return (
    <NplLayout>
      <div className="p-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/npl/profile"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold text-sam-text-primary">Edit Profile</h1>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <form className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <Image
                  src={formData.avatar}
                  alt="Profile Avatar"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-sam-primary shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-4 border-white"></div>
              </div>
              <button
                type="button"
                className="bg-sam-primary hover:bg-[#005a42] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <Camera size={16} />
                <span>Change Photo</span>
              </button>
            </div>
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-sam-text-primary mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-semibold text-sam-text-primary mb-4">Professional Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-6">
              <button
                onClick={handleSave}
                className="w-full bg-sam-primary hover:bg-[#005a42] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </button>
              
              <Link
                href="/npl/profile"
                className="w-full text-center text-sam-primary hover:text-[#005a42] font-medium py-2 transition-colors duration-200"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </NplLayout>
  );
}
