'use client';

import { useState } from 'react';
import NplLayout from '@/components/NplLayout';
import { mockDocuments } from '@/data/npl_mock';
import { Upload, Download, CheckCircle, XCircle, Clock, FileText, AlertCircle } from 'lucide-react';

export default function DocumentManagementPage() {
  const [uploading, setUploading] = useState<string | null>(null);

  const handleUpload = (documentId: string) => {
    setUploading(documentId);
    
    // Mock upload delay
    setTimeout(() => {
      setUploading(null);
      alert('Document uploaded successfully!');
    }, 2000);
  };

  const handleDownload = (documentName: string) => {
    alert(`Downloading ${documentName}...`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'missing':
        return <XCircle size={20} className="text-red-500" />;
      case 'pending':
        return <Clock size={20} className="text-yellow-500" />;
      default:
        return <AlertCircle size={20} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploaded':
        return 'bg-green-100 text-green-800';
      case 'missing':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploaded':
        return 'Uploaded';
      case 'missing':
        return 'Missing';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  return (
    <NplLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-2">
            Document Management
          </h1>
          <p className="text-gray-600">
            Upload and manage your required documents for debt clinic application.
          </p>
        </div>

        {/* Document List */}
        <div className="space-y-4 mb-6">
          {mockDocuments.map((document) => (
            <div key={document.id} className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText size={24} className="text-sam-primary" />
                  <div>
                    <h3 className="font-semibold text-sam-text-primary">
                      {document.name}
                    </h3>
                    {document.required && (
                      <span className="text-xs text-red-600 font-medium">
                        Required
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(document.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(document.status)}`}>
                      {getStatusText(document.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                {document.status === 'uploaded' ? (
                  <>
                    <button
                      onClick={() => handleDownload(document.name)}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => handleUpload(document.id)}
                      disabled={uploading === document.id}
                      className="flex items-center gap-2 bg-sam-primary hover:bg-[#005a42] disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      {uploading === document.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload size={16} />
                          <span>Replace</span>
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleUpload(document.id)}
                    disabled={uploading === document.id}
                    className="flex items-center gap-2 bg-sam-primary hover:bg-[#005a42] disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    {uploading === document.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        <span>Upload</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Upload Instructions */}
        <div className="bg-sam-accent rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-sam-text-primary mb-3">
            Upload Instructions
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-sam-primary rounded-full mt-2"></div>
              <span>Supported formats: PDF, JPG, PNG (Max 10MB each)</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-sam-primary rounded-full mt-2"></div>
              <span>Ensure documents are clear and readable</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-sam-primary rounded-full mt-2"></div>
              <span>All required documents must be uploaded for processing</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-sam-primary rounded-full mt-2"></div>
              <span>Documents will be reviewed within 3-5 business days</span>
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-semibold text-sam-text-primary mb-3">
            Upload Progress
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Required Documents</span>
              <span className="text-sm font-medium text-sam-text-primary">
                {mockDocuments.filter(doc => doc.required).filter(doc => doc.status === 'uploaded').length} / {mockDocuments.filter(doc => doc.required).length}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-sam-primary h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(mockDocuments.filter(doc => doc.required).filter(doc => doc.status === 'uploaded').length / mockDocuments.filter(doc => doc.required).length) * 100}%` 
                }}
              ></div>
            </div>
            
            <div className="text-xs text-gray-500">
              {mockDocuments.filter(doc => doc.required).filter(doc => doc.status === 'uploaded').length === mockDocuments.filter(doc => doc.required).length 
                ? 'All required documents uploaded!' 
                : 'Upload remaining required documents to complete your application'
              }
            </div>
          </div>
        </div>
      </div>
    </NplLayout>
  );
}
