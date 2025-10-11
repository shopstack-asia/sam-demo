'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import NpaLayout from '@/components/NpaLayout';
import { mockProperties } from '@/data/properties';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, X, ChevronDown, List, Map, Heart } from 'lucide-react';

// Google Maps types
interface GoogleMapsWindow extends Window {
  google: {
    maps: {
      Map: new (element: HTMLElement, options: Record<string, unknown>) => unknown;
      Marker: new (options: Record<string, unknown>) => unknown;
      InfoWindow: new (options: Record<string, unknown>) => unknown;
      Size: new (width: number, height: number) => unknown;
      Point: new (x: number, y: number) => unknown;
      MapTypeId: {
        ROADMAP: string;
      };
    };
  };
}

// Google Maps API Key - Replace with your actual API key
const GOOGLE_MAPS_API_KEY = 'AIzaSyDqymumDt7gZFuxBphek76YHP2S9HC6MJw';

function SearchContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [propertyType, setPropertyType] = useState('');
  const [keywords, setKeywords] = useState('');
  const [specialConditions, setSpecialConditions] = useState<string[]>([]);
  // const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get('type');

  // Filter properties by type, search term, and filters
  useEffect(() => {
    let filtered = mockProperties;
    
    // Filter by type if specified
    if (typeFilter) {
      filtered = filtered.filter(property => 
        property.type.toLowerCase() === typeFilter.toLowerCase()
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by price range
    if (priceRange.min) {
      filtered = filtered.filter(property => property.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(property => property.price <= parseFloat(priceRange.max));
    }
    
    // Filter by location
    if (location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    // Filter by property type
    if (propertyType) {
      filtered = filtered.filter(property => 
        property.type.toLowerCase() === propertyType.toLowerCase()
      );
    }
    
    // Filter by keywords
    if (keywords) {
      filtered = filtered.filter(property => 
        property.name.toLowerCase().includes(keywords.toLowerCase()) ||
        property.location.toLowerCase().includes(keywords.toLowerCase()) ||
        property.tags.some(tag => tag.toLowerCase().includes(keywords.toLowerCase()))
      );
    }
    
    // Filter by special conditions
    if (specialConditions.length > 0) {
      filtered = filtered.filter(property => 
        specialConditions.some(condition => 
          property.tags.some(tag => tag.toLowerCase().includes(condition.toLowerCase()))
        )
      );
    }
    
    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'location':
          return a.location.localeCompare(b.location);
        case 'size':
          return parseFloat(a.size || '0') - parseFloat(b.size || '0');
        case 'size-desc':
          return parseFloat(b.size || '0') - parseFloat(a.size || '0');
        case 'type':
          return a.type.localeCompare(b.type);
        case 'newest':
          return b.id.localeCompare(a.id); // Assuming newer properties have higher IDs
        case 'oldest':
          return a.id.localeCompare(b.id); // Assuming older properties have lower IDs
        default:
          return 0;
      }
    });
    
    setFilteredProperties(filtered);
  }, [typeFilter, searchTerm, priceRange, location, sortBy, propertyType, keywords, specialConditions]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Load Google Maps
  useEffect(() => {
    if (viewMode === 'map' && !mapLoaded) {
      // Check if Google Maps is already loaded
      if (typeof window !== 'undefined' && (window as unknown as GoogleMapsWindow).google && (window as unknown as GoogleMapsWindow).google.maps) {
        setMapLoaded(true);
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps loaded successfully');
        setMapLoaded(true);
        // Add delay to ensure mapRef is ready
        setTimeout(() => {
          initializeMap();
        }, 200);
      };
      script.onerror = (error) => {
        console.error('Failed to load Google Maps:', error);
        setMapLoaded(false);
      };
      document.head.appendChild(script);
    }
  }, [viewMode, mapLoaded]);

  // Initialize map when mapLoaded changes
  useEffect(() => {
    if (mapLoaded && viewMode === 'map') {
      initializeMap();
    }
  }, [mapLoaded, viewMode]);

  const initializeMap = () => {
    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      if (!mapRef.current || typeof window === 'undefined') {
        console.log('Map ref or window not available');
        return;
      }

      if (!(window as unknown as GoogleMapsWindow).google || !(window as unknown as GoogleMapsWindow).google.maps) {
        console.log('Google Maps not loaded yet');
        return;
      }

      console.log('Initializing Google Map...');
      console.log('Map ref element:', mapRef.current);
    
    // Bangkok center
    const bangkok = { lat: 13.7563, lng: 100.5018 };
    
    try {
      const map = new (window as unknown as GoogleMapsWindow).google.maps.Map(mapRef.current, {
        zoom: 12,
        center: bangkok,
        mapTypeId: (window as unknown as GoogleMapsWindow).google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    // Add random property markers with price-based colors
    const propertyLocations = [
      { lat: 13.7563, lng: 100.5018, name: "Condo Sukhumvit 39", price: "5M", priceValue: 5, type: "Condo" },
      { lat: 13.7300, lng: 100.5200, name: "House Thonglor", price: "6M", priceValue: 6, type: "House" },
      { lat: 13.7800, lng: 100.4800, name: "Townhouse Ari", price: "9M", priceValue: 9, type: "Townhouse" },
      { lat: 13.7200, lng: 100.5400, name: "Commercial Sathorn", price: "25M", priceValue: 25, type: "Commercial" },
      { lat: 13.7600, lng: 100.4900, name: "Office Silom", price: "18M", priceValue: 18, type: "Office" },
      { lat: 13.7400, lng: 100.5100, name: "Warehouse Bangna", price: "15M", priceValue: 15, type: "Warehouse" },
      { lat: 13.7700, lng: 100.4700, name: "Factory Lat Krabang", price: "22M", priceValue: 22, type: "Factory" },
      { lat: 13.7500, lng: 100.5300, name: "Land Phrom Phong", price: "35M", priceValue: 35, type: "Land" }
    ];

    // Function to get icon emoji based on asset type
    const getAssetIcon = (type: string) => {
      const icons: { [key: string]: string } = {
        'Condo': '🏢',
        'House': '🏡',
        'Townhouse': '🏘️',
        'Commercial': '🏬',
        'Office': '🏢',
        'Warehouse': '🏗️',
        'Factory': '🏭',
        'Land': '🌳'
      };
      return icons[type] || '🏢';
    };



    propertyLocations.forEach((location) => {
      const marker = new (window as unknown as GoogleMapsWindow).google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.name,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="rgba(0,0,0,0.3)"/>
                </filter>
              </defs>
              
              <!-- Price Background -->
              <rect x="5" y="5" width="50" height="18" rx="9" fill="white" stroke="#006E52" stroke-width="2" filter="url(#shadow)"/>
              
              <!-- Price Text -->
              <text x="30" y="17" text-anchor="middle" font-size="12" font-weight="bold" font-family="Arial, sans-serif" fill="#006E52">${location.price}</text>
              
              <!-- Asset Type Icon (Emoji) -->
              <text x="30" y="45" text-anchor="middle" font-size="20" filter="url(#shadow)">${getAssetIcon(location.type)}</text>
            </svg>
          `)}`,
          scaledSize: new (window as unknown as GoogleMapsWindow).google.maps.Size(60, 60),
          anchor: new (window as unknown as GoogleMapsWindow).google.maps.Point(30, 60)
        }
      });

      const infoWindow = new (window as unknown as GoogleMapsWindow).google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">${location.name}</h3>
            <p style="margin: 0 0 2px 0; font-size: 12px; color: #666;">${location.type}</p>
            <p style="margin: 0; font-size: 12px; color: #333; font-weight: bold;">${location.price} THB</p>
          </div>
        `
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (marker as any).addListener('click', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (infoWindow as any).open(map, marker);
        setSelectedProperty(location.name);
      });
    });
    
      console.log('Google Map initialized successfully');
      } catch (error) {
        console.error('Error initializing Google Map:', error);
      }
    }, 100); // 100ms delay
  };

  return (
    <NpaLayout>
      <div className="p-4 pb-20">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-4">
            {typeFilter ? `${typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)} Properties` : 'Search Properties'}
          </h1>
          {typeFilter && (
            <p className="text-gray-600 mb-4">
              Showing {filteredProperties.length} {typeFilter.toLowerCase()} properties
            </p>
          )}
          
          {/* Search Bar with Filter Icon */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by location, project, or property code"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary focus:border-transparent"
              />
            </div>
            <button 
              onClick={() => setShowFilterDrawer(true)}
              className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} />
            </button>
          </div>

          {/* Results Count and View Mode */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              {filteredProperties.length} properties found
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-sam-primary text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                  viewMode === 'map' 
                    ? 'bg-sam-primary text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Map size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Properties List or Map View */}
        {viewMode === 'list' ? (
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
                  <button className="px-2 py-2 border border-sam-primary text-sam-primary rounded-lg hover:bg-sam-primary hover:text-white transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        ) : (
          /* Map View */
          <div className="space-y-4">
            {/* Google Map */}
            <div className="bg-gray-100 rounded-lg h-64 relative overflow-hidden">
              {!mapLoaded ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Map size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Loading Google Map...</p>
                    <p className="text-sm text-gray-400 mt-2">Please wait</p>
                    <button 
                      onClick={() => {
                        console.log('Retrying Google Maps load...');
                        setMapLoaded(false);
                      }}
                      className="mt-2 px-3 py-1 bg-sam-primary text-white rounded text-sm hover:bg-[#005a42]"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <div ref={mapRef} className="w-full h-full rounded-lg"></div>
              )}
            </div>

            {/* Property Cards Slider */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-sam-text-primary mb-3">
                {selectedProperty ? `Selected: ${selectedProperty}` : 'Properties in this area'}
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {filteredProperties.slice(0, 5).map((property) => (
                  <div 
                    key={property.id} 
                    className={`flex-shrink-0 w-48 bg-white border rounded-lg overflow-hidden shadow-sm transition-all duration-200 ${
                      selectedProperty === property.name 
                        ? 'border-sam-primary shadow-lg' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="relative h-32">
                      <Image
                        src={property.image}
                        alt={property.name}
                        width={200}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
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
                      {selectedProperty === property.name && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-sam-primary rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm text-sam-text-primary truncate">
                        {property.name}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">{property.location}</p>
                      <p className="text-sm font-bold text-sam-primary mt-1">
                        {property.price} {property.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <div className="flex justify-center gap-2 mt-3">
                <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <span className="text-sm">‹</span>
                </button>
                <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                  <span className="text-sm">›</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {filteredProperties.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No properties found matching your search.</p>
          </div>
        )}

        {/* Filter Drawer */}
        {showFilterDrawer && (
          <div className="fixed inset-0 z-50 flex items-end">
            <div className="absolute inset-0 bg-black" style={{opacity: 0.5}}></div>
            <div className="relative bg-white w-full max-h-[70vh] rounded-t-2xl p-6 transform transition-transform duration-300 ease-out overflow-y-auto mb-20">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-sam-text-primary">Filter & Sort</h3>
                <button 
                  onClick={() => setShowFilterDrawer(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-sam-text-primary mb-3">Price Range (THB M)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-sam-text-primary mb-2">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary appearance-none"
                >
                  <option value="">All Types</option>
                  <option value="Condo">Condo</option>
                  <option value="House">House</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Office">Office</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Factory">Factory</option>
                  <option value="Land">Land</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-sam-text-primary mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary"
                />
              </div>

              {/* Keywords */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-sam-text-primary mb-2">Related Keywords</label>
                <input
                  type="text"
                  placeholder="e.g., Location, BTS, Village name, District"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary"
                />
              </div>

              {/* Special Conditions */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-sam-text-primary mb-2">Special Conditions</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Hot Deal', 'Best Location', 'New Listing', 'Available', 'Promotion', 'Special Price'].map((condition) => (
                    <label key={condition} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={specialConditions.includes(condition)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSpecialConditions([...specialConditions, condition]);
                          } else {
                            setSpecialConditions(specialConditions.filter(c => c !== condition));
                          }
                        }}
                        className="mr-3 h-4 w-4 text-sam-primary focus:ring-sam-primary border-gray-300 rounded"
                      />
                      <span className="text-xs text-gray-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-sam-text-primary mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sam-primary"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="location">Location (A-Z)</option>
                  <option value="size">Size (Small to Large)</option>
                  <option value="size-desc">Size (Large to Small)</option>
                  <option value="type">Property Type</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setShowFilterDrawer(false)}
                  className="flex-1 px-4 py-3 bg-sam-primary text-white rounded-lg hover:bg-[#005a42] transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  onClick={() => {
                    setPriceRange({ min: '', max: '' });
                    setLocation('');
                    setPropertyType('');
                    setKeywords('');
                    setSpecialConditions([]);
                    setSortBy('name');
                  }}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </NpaLayout>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
