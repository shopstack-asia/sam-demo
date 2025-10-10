import NpaLayout from '@/components/NpaLayout';
import { mockProperties } from '@/data/properties';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Share, Download, Phone } from 'lucide-react';

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = mockProperties.find(p => p.id === params.id);

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
      <div className="p-4">
        {/* Property Image */}
        <div className="relative mb-4">
          <Image
            src={property.image}
            alt={property.name}
            width={400}
            height={300}
            className="w-full h-64 object-cover rounded-lg"
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
            
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-sam-primary text-sam-primary rounded-lg hover:bg-sam-primary hover:text-white transition-colors">
                <Heart size={16} />
                <span>Save</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-sam-primary text-sam-primary rounded-lg hover:bg-sam-primary hover:text-white transition-colors">
                <Share size={16} />
                <span>Share</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 border border-sam-primary text-sam-primary rounded-lg hover:bg-sam-primary hover:text-white transition-colors">
                <Download size={16} />
                <span>Download</span>
              </button>
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
