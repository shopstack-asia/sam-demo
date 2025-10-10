'use client';

import { useState } from 'react';
import NpaLayout from '@/components/NpaLayout';
import { Upload, CheckCircle } from 'lucide-react';

export default function SubmitInterestPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, this would send data to a server
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = () => {
    // In a real app, this would handle file upload
    alert('File upload functionality would be implemented here');
  };

  if (isSubmitted) {
    return (
      <NpaLayout>
        <div className="p-4">
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-sam-text-primary mb-2">
              Interest Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest. We will contact you soon with more information.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-sam-primary hover:bg-[#005a42] text-sam-text-light font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Submit Another Interest
            </button>
          </div>
        </div>
      </NpaLayout>
    );
  }

  return (
    <NpaLayout>
      <div className="p-4 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-2">
            Submit Interest
          </h1>
          <p className="text-gray-600">
            Submit your interest in our properties and upload relevant documents.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="font-semibold text-sam-text-primary mb-4">Personal Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your interest in our properties..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="font-semibold text-sam-text-primary mb-4">Document Upload</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto text-gray-400 mb-4" size={48} />
              <h4 className="font-medium text-gray-700 mb-2">Upload Documents</h4>
              <p className="text-gray-500 text-sm mb-4">
                Upload relevant documents (ID card, income proof, etc.)
              </p>
              <button
                type="button"
                onClick={handleFileUpload}
                className="bg-sam-primary hover:bg-[#005a42] text-sam-text-light font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Choose Files
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <p>Supported formats: PDF, JPG, PNG (Max 10MB per file)</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-sam-primary hover:bg-[#005a42] text-sam-text-light font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Submit Interest
            </button>
          </div>
        </form>
      </div>
    </NpaLayout>
  );
}
