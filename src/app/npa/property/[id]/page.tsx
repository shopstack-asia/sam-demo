'use client';

import NpaLayout from '@/components/NpaLayout';
import { mockProperties } from '@/data/properties';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Share, Download, Phone, ChevronLeft, ChevronRight, ArrowLeft, QrCode } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [property, setProperty] = useState<typeof mockProperties[0] | null>(null);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  
  // Generate multiple images for carousel
  const generateCarouselImages = (property: typeof mockProperties[0]) => {
    const baseImages = [
      property.image,
      '/images/condo1.jpg',
      '/images/condo2.jpg', 
      '/images/condo3.jpg',
      '/images/house1.jpg',
      '/images/house2.jpg'
    ];
    return baseImages.slice(0, 6); // Take first 6 images
  };

  // Load property data
  useEffect(() => {
    const loadProperty = async () => {
      const { id } = await params;
      const foundProperty = mockProperties.find(p => p.id === id);
      setProperty(foundProperty || null);
      if (foundProperty) {
        setCarouselImages(generateCarouselImages(foundProperty));
      }
    };
    loadProperty();
  }, [params]);

  // Auto slide effect
  useEffect(() => {
    if (carouselImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  if (!property) {
    return (
      <NpaLayout>
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-4">
            Property Not Found
          </h1>
          <Link
            href="/npa"
            className="bg-sam-primary hover:bg-[#005a42] text-sam-text-light font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Back to Properties
          </Link>
        </div>
      </NpaLayout>
    );
  }

  return (
    <NpaLayout>
      <div className="p-4 pb-20">
        {/* Back Button */}
        <div className="mb-4">
          <Link
            href="/npa"
            className="inline-flex items-center gap-2 text-sam-primary hover:text-[#005a42] transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Properties</span>
          </Link>
        </div>

        {/* Property Image Carousel */}
        <div className="relative mb-4">
          <div className="relative w-full h-64 overflow-hidden rounded-lg">
            <div className="relative w-full h-full">
              {carouselImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={property.name}
                  width={400}
                  height={300}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            
            {/* Navigation Arrows */}
            {carouselImages.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => 
                    prev === 0 ? carouselImages.length - 1 : prev - 1
                  )}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 hover:scale-110 transition-all duration-300 ease-in-out"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => 
                    prev === carouselImages.length - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 hover:scale-110 transition-all duration-300 ease-in-out"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            
            {/* Image Counter */}
            {carouselImages.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm transition-all duration-300 ease-in-out hover:bg-opacity-70">
                {currentImageIndex + 1} / {carouselImages.length}
              </div>
            )}
          </div>
          
          {/* Image Dots Indicator */}
          {carouselImages.length > 1 && (
            <div className="flex justify-center gap-2 mt-3">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out hover:scale-125 ${
                    index === currentImageIndex 
                      ? 'bg-sam-primary scale-125' 
                      : 'bg-gray-300 hover:bg-sam-secondary'
                  }`}
                />
              ))}
            </div>
          )}
          
          {/* Tags */}
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

        {/* Property Details */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-2">
            {property.name}
          </h1>
          <p className="text-sam-primary font-bold text-2xl mb-2">
            {property.price} {property.unit}
          </p>
          <p className="text-gray-600 mb-4">{property.location}</p>
          
          {property.size && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-sm text-gray-500">Size</div>
                <div className="font-semibold">{property.size}</div>
              </div>
              {property.bedrooms && (
                <div className="text-center">
                  <div className="text-sm text-gray-500">Bedrooms</div>
                  <div className="font-semibold">{property.bedrooms}</div>
                </div>
              )}
              {property.bathrooms && (
                <div className="text-center">
                  <div className="text-sm text-gray-500">Bathrooms</div>
                  <div className="font-semibold">{property.bathrooms}</div>
                </div>
              )}
            </div>
          )}

          <p className="text-gray-700 mb-6">{property.description}</p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/npa/appointment"
              className="w-full bg-sam-primary hover:bg-[#005a42] text-sam-text-light font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center block"
            >
              Schedule Viewing
            </Link>
            
            <div className="flex justify-end gap-3">
              <button className="w-8 h-8 flex items-center justify-center bg-white border-2 border-sam-primary text-sam-primary rounded-full hover:bg-sam-primary hover:text-white transition-colors duration-200 shadow-md">
                <Heart size={13} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-white border-2 border-sam-primary text-sam-primary rounded-full hover:bg-sam-primary hover:text-white transition-colors duration-200 shadow-md">
                <Share size={13} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-white border-2 border-sam-primary text-sam-primary rounded-full hover:bg-sam-primary hover:text-white transition-colors duration-200 shadow-md">
                <Download size={13} />
              </button>
              <Link
                href="/npa/payment"
                className="w-8 h-8 flex items-center justify-center bg-sam-primary text-white rounded-full hover:bg-[#005a42] transition-colors duration-200 shadow-md"
              >
                <QrCode size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Options */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-semibold text-sam-text-primary mb-3">Contact Options</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
              <Phone size={16} />
              <span>Line Chat</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Phone size={16} />
              <span>Call</span>
            </button>
          </div>
        </div>
      </div>
    </NpaLayout>
  );
}
