'use client';

import NpaLayout from '@/components/NpaLayout';
import { mockProperties } from '@/data/properties';
import Link from 'next/link';
import Image from 'next/image';
// import { useState } from 'react';

// Group properties by type
const groupPropertiesByType = (properties: typeof mockProperties) => {
  const grouped: { [key: string]: typeof mockProperties } = {};
  
  properties.forEach(property => {
    if (!grouped[property.type]) {
      grouped[property.type] = [];
    }
    grouped[property.type].push(property);
  });
  
  return grouped;
};

  // Get representative images for each property type
  const getTypeImages = (type: string) => {
    const typeImages: { [key: string]: string[] } = {
      'Condo': ['/images/condo-type.jpg', '/images/condo1.jpg', '/images/condo2.jpg', '/images/condo3.jpg'],
      'House': ['/images/house-type.jpg', '/images/house1.jpg', '/images/house2.jpg'],
      'Townhouse': ['/images/townhouse-type.jpg', '/images/house1.jpg', '/images/house2.jpg'],
      'Commercial': ['/images/commercial-type.jpg', '/images/commercial1.jpg'],
      'Office': ['/images/office-type.jpg', '/images/office1.jpg'],
      'Warehouse': ['/images/warehouse-type.jpg', '/images/warehouse1.jpg'],
      'Factory': ['/images/factory-type.jpg', '/images/factory1.jpg'],
      'Land': ['/images/land-type.jpg', '/images/land1.jpg']
    };
    
    return typeImages[type] || ['/images/condo-type.jpg'];
  };

export default function NpaPage() {
  // const [selectedType, setSelectedType] = useState<string | null>(null);
  const groupedProperties = groupPropertiesByType(mockProperties);
  const propertyTypes = Object.keys(groupedProperties);

  return (
    <NpaLayout>
      <div className="p-4 pb-20">
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
          <h2 className="text-lg font-semibold text-sam-text-primary mb-2">
            Welcome to SAM NPA Line Official Account
          </h2>
          <p className="text-gray-600 text-sm">
            Browse our available properties by category and find your perfect investment opportunity.
          </p>
        </div>

        {/* Property Types */}
        <div className="space-y-6">
          {propertyTypes.map((type) => {
            const properties = groupedProperties[type];
            const typeImages = getTypeImages(type);
            const mainImage = typeImages[0];
            const sampleProperties = properties.slice(0, 4); // Show max 4 properties per type

            return (
              <div key={type} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Type Header with Large Image */}
                <div className="relative h-48">
                  <img
                    src={mainImage}
                    alt={type}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black" style={{opacity: 0.2}}></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{type}</h3>
                    <p className="text-sm opacity-90">{properties.length} properties available</p>
                  </div>
                </div>

                {/* Sample Properties */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                        {sampleProperties.map((property) => (
                      <Link
                        key={property.id}
                        href={`/npa/property/${property.id}`}
                        className="block"
                      >
                        <div className="relative">
                          <Image
                            src={property.image}
                            alt={property.name}
                            width={200}
                            height={120}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <div className="absolute top-1 left-1">
                            {property.tags.slice(0, 1).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
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
                        <div className="mt-2">
                          <h4 className="font-medium text-sm text-sam-text-primary truncate">
                            {property.name}
                          </h4>
                          <p className="text-xs text-gray-600 truncate">{property.location}</p>
                          <p className="text-sm font-bold text-sam-primary">
                            {property.price} {property.unit}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  {/* View All Button */}
                  <Link
                    href={`/npa/search?type=${type.toLowerCase()}`}
                    className="w-full bg-sam-primary hover:bg-[#005a42] text-sam-text-light font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center block"
                  >
                    View All {type} Properties
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </NpaLayout>
  );
}
