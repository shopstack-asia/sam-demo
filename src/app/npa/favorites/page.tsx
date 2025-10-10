'use client';

import { useState } from 'react';
import NpaLayout from '@/components/NpaLayout';
import { mockProperties } from '@/data/properties';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Search, Filter, X } from 'lucide-react';

export default function FavoritesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  // Mock favorite properties (first 6 properties as favorites)
  const favoriteProperties = mockProperties.slice(0, 6);

  const [favorites, setFavorites] = useState(favoriteProperties.map(p => p.id));

  const handleRemoveFavorite = (propertyId: string) => {
    setFavorites(prev => prev.filter(id => id !== propertyId));
  };

  const filteredProperties = favoriteProperties.filter(property => 
    favorites.includes(property.id) &&
    (property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     property.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <NpaLayout>
      <div className="p-4 pb-20">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-2">My Favorites</h1>
          <p className="text-gray-600">
            {filteredProperties.length} saved properties
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search your favorites..."
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
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="location">Location</option>
              <option value="type">Property Type</option>
            </select>
          </div>
        )}

        {/* Favorites List */}
        {filteredProperties.length > 0 ? (
          <div className="space-y-4">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex">
                  {/* Property Image */}
                  <div className="relative w-32 h-24 flex-shrink-0">
                    <Image
                      src={property.image}
                      alt={property.name}
                      width={128}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      {property.tags.slice(0, 1).map((tag, index) => (
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

                  {/* Property Details */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-sam-text-primary text-sm mb-1">
                          {property.name}
                        </h3>
                        <p className="text-gray-600 text-xs mb-1">
                          {property.location}
                        </p>
                        <p className="text-sam-primary font-bold text-sm">
                          {property.price} {property.unit}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFavorite(property.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Heart size={16} className="fill-current" />
                      </button>
                    </div>

                    {/* Property Info */}
                    <div className="flex gap-4 text-xs text-gray-500 mb-3">
                      {property.bedrooms && (
                        <span>{property.bedrooms} bed</span>
                      )}
                      {property.bathrooms && (
                        <span>{property.bathrooms} bath</span>
                      )}
                      {property.size && (
                        <span>{property.size}</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        href={`/npa/property/${property.id}`}
                        className="flex-1 bg-sam-primary hover:bg-[#005a42] text-white font-medium py-2 px-3 rounded-lg transition-colors duration-200 text-center text-sm"
                      >
                        Details
                      </Link>
                      <Link
                        href="/npa/payment"
                        className="px-3 py-2 border border-sam-primary text-sam-primary rounded-lg hover:bg-sam-primary hover:text-white transition-colors text-sm"
                      >
                        Deposit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">
              {searchTerm ? 'No favorites found' : 'No favorites yet'}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Start saving properties you like'
              }
            </p>
            {!searchTerm && (
              <Link
                href="/npa/search"
                className="inline-block bg-sam-primary hover:bg-[#005a42] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Browse Properties
              </Link>
            )}
          </div>
        )}
      </div>
    </NpaLayout>
  );
}
