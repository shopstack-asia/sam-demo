'use client';

import NplLayout from '@/components/NplLayout';
import { MessageCircle, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  const handleCall = (number: string) => {
    alert(`Calling ${number}...`);
  };

  const handleEmail = (email: string) => {
    alert(`Opening email to ${email}...`);
  };

  const handleLine = () => {
    alert('Opening LINE chat with @samasset...');
  };


  return (
    <NplLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-2">
            Contact Support
          </h1>
          <p className="text-gray-600">
            Get in touch with our SAM Debt Clinic team for assistance.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="space-y-4 mb-6">
          {/* Phone Support */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-sam-primary rounded-full flex items-center justify-center">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sam-text-primary">
                  Phone Support
                </h3>
                <p className="text-sm text-gray-600">
                  Call our debt clinic hotline
                </p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-sam-text-primary">
                  1443
                </span>
                <span className="text-sm text-gray-600">SAM Debt Clinic Hotline</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-sam-text-primary">
                  02-686-1888
                </span>
                <span className="text-sm text-gray-600">Bangkok Main Office</span>
              </div>
            </div>

            <button
              onClick={() => handleCall('1443')}
              className="w-full bg-sam-primary hover:bg-[#005a42] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              <span>Call SAM Debt Clinic</span>
            </button>
          </div>

          {/* LINE Support */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sam-text-primary">
                  LINE Support
                </h3>
                <p className="text-sm text-gray-600">
                  Chat with us on LINE
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-lg font-bold text-sam-text-primary mb-2">
                @samasset
              </div>
              <p className="text-sm text-gray-600">
                Available 24/7 for quick assistance
              </p>
            </div>

            <button
              onClick={handleLine}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              <span>Chat via LINE</span>
            </button>
          </div>

          {/* Email Support */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Mail size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sam-text-primary">
                  Email Support
                </h3>
                <p className="text-sm text-gray-600">
                  Send us an email
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-lg font-bold text-sam-text-primary mb-2">
                info@sam.co.th
              </div>
              <p className="text-sm text-gray-600">
                Response within 24 hours
              </p>
            </div>

            <button
              onClick={() => handleEmail('info@sam.co.th')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              <span>Send Email</span>
            </button>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <h3 className="font-semibold text-sam-text-primary mb-3">
            Operating Hours
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-sam-primary" />
              <span className="font-medium">Phone Support:</span>
              <span>Mon-Fri 09:00-17:00</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle size={16} className="text-green-500" />
              <span className="font-medium">LINE Support:</span>
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-blue-500" />
              <span className="font-medium">Email Support:</span>
              <span>Response within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Branch Locations */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <h3 className="font-semibold text-sam-text-primary mb-3">
            Visit Our Branches
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-sam-primary" />
              <span className="font-medium">Bangkok Main Office:</span>
              <span>123 Sukhumvit Road, Bangkok 10110</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-sam-primary" />
              <span className="font-medium">Chiang Mai Branch:</span>
              <span>416 Mahidol Rd, Chiang Mai 50000</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-sam-primary" />
              <span className="font-medium">Phuket Branch:</span>
              <span>79/6 Thepkasattri Rd, Phuket 83000</span>
            </div>
          </div>
          
          <button
            onClick={() => window.location.href = '/npl/branches'}
            className="mt-3 w-full border border-sam-primary text-sam-primary font-medium py-2 px-4 rounded-lg hover:bg-sam-primary hover:text-white transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ExternalLink size={16} />
            <span>View All Branches</span>
          </button>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 mb-2">
            Emergency Contact
          </h3>
          <p className="text-sm text-red-700 mb-3">
            For urgent debt-related matters outside business hours
          </p>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-red-600" />
            <span className="font-bold text-red-800">1443</span>
            <span className="text-sm text-red-700">(24/7 Hotline)</span>
          </div>
        </div>
      </div>
    </NplLayout>
  );
}
