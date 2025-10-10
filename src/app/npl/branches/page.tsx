'use client';

import NplLayout from '@/components/NplLayout';
import { mockBranches } from '@/data/npl_mock';
import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react';

export default function BranchesPage() {
  const handleCall = (phone: string) => {
    alert(`Calling ${phone}...`);
  };

  const handleDirections = (branchName: string) => {
    alert(`Opening directions to ${branchName}...`);
  };

  return (
    <NplLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-2">
            Branch Locations
          </h1>
          <p className="text-gray-600">
            Find our SAM branches and service locations near you.
          </p>
        </div>

        {/* Branch List */}
        <div className="space-y-4 mb-6">
          {mockBranches.map((branch, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sam-primary rounded-full flex items-center justify-center">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sam-text-primary">
                      {branch.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {branch.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Branch Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} className="text-sam-primary" />
                  <span>{branch.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} className="text-sam-primary" />
                  <span>{branch.hours}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleCall(branch.phone)}
                  className="flex-1 flex items-center justify-center gap-2 bg-sam-primary hover:bg-[#005a42] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  <Phone size={16} />
                  <span>Call</span>
                </button>
                <button
                  onClick={() => handleDirections(branch.name)}
                  className="flex-1 flex items-center justify-center gap-2 border border-sam-primary text-sam-primary font-medium py-2 px-4 rounded-lg hover:bg-sam-primary hover:text-white transition-colors duration-200"
                >
                  <Navigation size={16} />
                  <span>Directions</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <h3 className="font-semibold text-sam-text-primary mb-3">
            Interactive Map
          </h3>
          <div className="bg-sam-accent rounded-lg p-8 text-center">
            <MapPin size={48} className="text-sam-primary mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Click on any branch above to view on map
            </p>
            <button className="bg-sam-primary hover:bg-[#005a42] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto">
              <ExternalLink size={16} />
              <span>Open in Maps</span>
            </button>
          </div>
        </div>

        {/* Services Information */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <h3 className="font-semibold text-sam-text-primary mb-3">
            Services Available
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sam-primary rounded-full"></div>
              <span>Debt Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sam-primary rounded-full"></div>
              <span>Document Submission</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sam-primary rounded-full"></div>
              <span>Payment Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sam-primary rounded-full"></div>
              <span>Account Management</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-sam-accent rounded-lg p-4">
          <h3 className="font-semibold text-sam-text-primary mb-3">
            Need Help Finding Us?
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex items-start gap-2">
              <Phone size={16} className="text-sam-primary mt-0.5" />
              <div>
                <p className="font-medium">Call our hotline:</p>
                <p>02-686-1888 (Bangkok)</p>
                <p>Available Mon-Fri 09:00-17:00</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock size={16} className="text-sam-primary mt-0.5" />
              <div>
                <p className="font-medium">Operating Hours:</p>
                <p>Monday - Friday: 09:00 - 17:00</p>
                <p>Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NplLayout>
  );
}
