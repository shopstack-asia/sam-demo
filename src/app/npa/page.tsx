import NpaLayout from '@/components/NpaLayout';
import { mockProperties } from '@/data/properties';
import Link from 'next/link';
import Image from 'next/image';

export default function NpaPage() {
  const featuredProperties = mockProperties;

  return (
    <NpaLayout>
      <div className="p-4 pb-20">
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
          <h2 className="text-lg font-semibold text-sam-text-primary mb-2">
            Welcome to SAM NPA Line Official Account
          </h2>
          <p className="text-gray-600 text-sm">
            Browse our available properties and find your perfect investment opportunity.
          </p>
        </div>

        {/* Featured Properties */}
        <div className="space-y-4">
          {featuredProperties.map((property) => (
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
                
                <Link
                  href={`/npa/property/${property.id}`}
                  className="w-full bg-sam-primary hover:bg-[#005a42] text-sam-text-light font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center block"
                >
                  Book to visit property
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </NpaLayout>
  );
}
