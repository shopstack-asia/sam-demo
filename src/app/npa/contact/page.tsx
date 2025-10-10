'use client';

import NpaLayout from '@/components/NpaLayout';
import { MessageCircle, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MessageCircle,
      title: 'LINE Chat',
      value: '@samasset',
      action: 'Chat on LINE',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@sam.co.th',
      action: 'Send Email',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+66 2 686 1888',
      action: 'Call Now',
      color: 'bg-sam-primary hover:bg-[#005a42]'
    }
  ];

  const handleContact = (type: string, value: string) => {
    switch (type) {
      case 'LINE Chat':
        alert(`Opening LINE chat with ${value}`);
        break;
      case 'Email':
        window.location.href = `mailto:${value}`;
        break;
      case 'Phone':
        window.location.href = `tel:${value}`;
        break;
      default:
        break;
    }
  };

  return (
    <NpaLayout>
      <div className="p-4 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-2">
            Contact Us
          </h1>
          <p className="text-gray-600">
            Get in touch with our team for any questions or support.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="space-y-4 mb-6">
          {contactInfo.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-sam-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                      <Icon className="text-sam-primary" size={24} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sam-text-primary mb-1">
                      {contact.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {contact.value}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleContact(contact.title, contact.value)}
                    className={`flex-shrink-0 ${contact.color} text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200`}
                  >
                    {contact.action}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Office Information */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <h3 className="font-semibold text-sam-text-primary mb-4">Office Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="text-sam-primary mt-1" size={20} />
              <div>
                <p className="font-medium text-sam-text-primary">Address</p>
                <p className="text-gray-600 text-sm">
                  123 Sukhumvit Road, Watthana District<br />
                  Bangkok 10110, Thailand
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="text-sam-primary mt-1" size={20} />
              <div>
                <p className="font-medium text-sam-text-primary">Business Hours</p>
                <p className="text-gray-600 text-sm">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-sam-accent rounded-lg p-4">
          <h3 className="font-semibold text-sam-text-primary mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white hover:bg-gray-50 text-sam-text-primary font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm">
              Schedule Callback
            </button>
            <button className="bg-white hover:bg-gray-50 text-sam-text-primary font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm">
              Request Information
            </button>
          </div>
        </div>
      </div>
    </NpaLayout>
  );
}
