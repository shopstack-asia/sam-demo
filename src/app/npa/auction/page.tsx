'use client';

import { useState } from 'react';
import NpaLayout from '@/components/NpaLayout';
import { mockProperties } from '@/data/properties';
import Link from 'next/link';
import Image from 'next/image';
import { Gavel, Clock, Search, Filter, X, Calendar, MapPin } from 'lucide-react';

export default function AuctionPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState('ending-soon');

  // Mock auction properties with auction data
  const auctionProperties = mockProperties.slice(0, 8).map((property, index) => ({
    ...property,
    auctionId: `AUCT-${String(index + 1).padStart(3, '0')}`,
    startingPrice: property.price * 0.7, // 70% of market price
    currentBid: property.price * (0.75 + Math.random() * 0.2), // Random bid between 75-95%
    bidCount: Math.floor(Math.random() * 20) + 1,
    timeLeft: {
      days: Math.floor(Math.random() * 7),
      hours: Math.floor(Math.random() * 24),
      minutes: Math.floor(Math.random() * 60)
    },
    status: index < 3 ? 'live' : index < 6 ? 'upcoming' : 'ended'
  }));

  const filteredProperties = auctionProperties.filter(property => 
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.auctionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500 text-white';
      case 'upcoming': return 'bg-blue-500 text-white';
      case 'ended': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'LIVE';
      case 'upcoming': return 'UPCOMING';
      case 'ended': return 'ENDED';
      default: return 'UNKNOWN';
    }
  };

  return (
    <NpaLayout>
      <div className="p-4 pb-20">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-2">Property Auctions</h1>
          <p className="text-gray-600">
            {filteredProperties.length} auction properties available
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search auctions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
            />
          </div>
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={20} />
          </button>
        </div>

        {/* Filter Options */}
        {showFilter && (
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sam-text-primary">Sort by</h3>
              <button 
                onClick={() => setShowFilter(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={16} />
              </button>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary"
            >
              <option value="ending-soon">Ending Soon</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Starting Price (Low to High)</option>
              <option value="price-high">Starting Price (High to Low)</option>
              <option value="bids">Most Bids</option>
              <option value="status">Status</option>
            </select>
          </div>
        )}

        {/* Auction Properties */}
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div key={property.auctionId} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <Image
                  src={property.image}
                  alt={property.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(property.status)}`}>
                    {getStatusText(property.status)}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-sam-primary text-white">
                    {property.auctionId}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-black bg-opacity-70 text-white">
                    {property.bidCount} bids
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-sam-text-primary mb-1">
                  {property.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2 flex items-center">
                  <MapPin size={14} className="mr-1" />
                  {property.location}
                </p>
                
                {/* Auction Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Starting Price</p>
                    <p className="font-semibold text-sam-primary">
                      {property.startingPrice.toFixed(1)} {property.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Current Bid</p>
                    <p className="font-semibold text-red-600">
                      {property.currentBid.toFixed(1)} {property.unit}
                    </p>
                  </div>
                </div>

                {/* Time Left */}
                {property.status === 'live' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-center text-red-600">
                      <Clock size={16} className="mr-2" />
                      <span className="font-medium">
                        {property.timeLeft.days}d {property.timeLeft.hours}h {property.timeLeft.minutes}m left
                      </span>
                    </div>
                  </div>
                )}

                {property.status === 'upcoming' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-center text-blue-600">
                      <Calendar size={16} className="mr-2" />
                      <span className="font-medium">Starts in 2 days</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/npa/property/${property.id}`}
                    className="flex-1 bg-sam-primary hover:bg-[#005a42] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                  >
                    View Details
                  </Link>
                  {property.status === 'live' && (
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                      Place Bid
                    </button>
                  )}
                  {property.status === 'upcoming' && (
                    <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      Set Reminder
                    </button>
                  )}
                  {property.status === 'ended' && (
                    <button className="px-4 py-2 border border-gray-400 text-gray-600 rounded-lg cursor-not-allowed" disabled>
                      Auction Ended
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Gavel size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">
              {searchTerm ? 'No auctions found' : 'No auctions available'}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Check back later for new auctions'
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="inline-block bg-sam-primary hover:bg-[#005a42] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </NpaLayout>
  );
}
