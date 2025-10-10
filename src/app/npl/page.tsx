import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

export default function NplPage() {
  return (
    <div className="min-h-screen bg-sam-accent">
      {/* Header */}
      <header className="bg-sam-primary text-sam-text-light px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft size={20} />
            <span className="text-xl font-bold">SAM NPL</span>
          </Link>
          <div className="w-6 h-6 bg-sam-secondary rounded-full"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="max-w-md w-full text-center">
          {/* Coming Soon Icon */}
          <div className="w-24 h-24 bg-sam-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="text-sam-primary" size={48} />
          </div>

          {/* Coming Soon Message */}
          <h1 className="text-3xl font-bold text-sam-text-primary mb-4">
            NPL Section Coming Soon
          </h1>
          <p className="text-gray-600 mb-8">
            We&apos;re working hard to bring you the Non-Performing Loan (NPL) service. 
            This feature will be available soon.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              href="/npa"
              className="block w-full bg-sam-primary hover:bg-[#005a42] text-sam-text-light font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Explore NPA Properties
            </Link>
            
            <Link
              href="/"
              className="block w-full border border-sam-primary text-sam-primary hover:bg-sam-primary hover:text-sam-text-light font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-sm text-gray-500">
            <p>For immediate assistance, please contact our support team.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
