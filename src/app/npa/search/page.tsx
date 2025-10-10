'use client';

import { useState } from 'react';
import NpaLayout from '@/components/NpaLayout';
import { mockProperties } from '@/data/properties';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter } from 'lucide-react';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = mockProperties.filter(
      (property) =>
        property.name.toLowerCase().includes(term.toLowerCase()) ||
        property.location.toLowerCase().includes(term.toLowerCase()) ||
        property.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredProperties(filtered);
  };

  return (
    <NpaLayout>
      <div className="p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-4">
            Search Properties
          </h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by location, project, or property code"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              <span>Price Range</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              <span>Location</span>
            </button>
          </div>
        </div>

        {/* Properties List */}
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <Image
                  src={property.image}
                  alt={property.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex gap-1">
                  {property.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        tag === 'Hot Deal'
                          ? 'bg-red-500 text-white'
                          : tag === 'Best Location'
                          ? 'bg-blue-500 text-white'
                          : tag === 'New Listing'
                          ? 'bg-gray-500 text-white'
                          : 'bg-sam-primary text-white'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-sam-text-primary mb-1">
                  {property.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {property.location}
                </p>
                <p className="text-sam-primary font-bold text-lg mb-3">
                  {property.price} {property.unit}
                </p>
                
                <div className="flex gap-2">
                  <Link
                    href={`/npa/property/${property.id}`}
                    className="flex-1 bg-sam-primary hover:bg-[#005a42] text-sam-text-light font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                  >
                    View Details
                  </Link>
                  <button className="px-4 py-2 border border-sam-primary text-sam-primary rounded-lg hover:bg-sam-primary hover:text-white transition-colors">
                    ♥
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No properties found matching your search.</p>
          </div>
        )}
      </div>
    </NpaLayout>
  );
}
