'use client';

import NpaLayout from '@/components/NpaLayout';
import { FileText, Download, FileCheck, DollarSign } from 'lucide-react';

export default function BrochurePage() {
  const documents = [
    {
      id: 1,
      title: 'Property Brochure',
      description: 'Complete property information including photos, location details, and amenities.',
      icon: FileText,
      size: '2.4 MB',
      type: 'PDF'
    },
    {
      id: 2,
      title: 'Bidding Document',
      description: 'Official bidding terms, conditions, and procedures for the property.',
      icon: FileCheck,
      size: '1.8 MB',
      type: 'PDF'
    },
    {
      id: 3,
      title: 'Legal Documents',
      description: 'Legal documentation, ownership papers, and compliance certificates.',
      icon: FileText,
      size: '3.2 MB',
      type: 'PDF'
    },
    {
      id: 4,
      title: 'Tax & Fee List',
      description: 'Detailed breakdown of taxes, fees, and additional costs.',
      icon: DollarSign,
      size: '0.8 MB',
      type: 'PDF'
    }
  ];

  const handleDownload = (documentId: number) => {
    // In a real app, this would trigger a download
    alert(`Downloading document ${documentId}...`);
  };

  return (
    <NpaLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-2">
            Download Brochure
          </h1>
          <p className="text-gray-600">
            Access property documents, legal papers, and detailed information.
          </p>
        </div>

        <div className="space-y-4">
          {documents.map((doc) => {
            const Icon = doc.icon;
            return (
              <div key={doc.id} className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-sam-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                      <Icon className="text-sam-primary" size={24} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sam-text-primary mb-1">
                      {doc.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {doc.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDownload(doc.id)}
                    className="flex-shrink-0 flex items-center gap-2 bg-sam-primary hover:bg-[#005a42] text-sam-text-light px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-6 bg-sam-accent rounded-lg p-4">
          <h3 className="font-semibold text-sam-text-primary mb-2">
            Document Information
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• All documents are in PDF format</li>
            <li>• Documents are updated regularly</li>
            <li>• For questions about documents, contact our support team</li>
            <li>• Some documents may require additional verification</li>
          </ul>
        </div>
      </div>
    </NpaLayout>
  );
}
