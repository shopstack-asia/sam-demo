'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NplLayout from '@/components/NplLayout';
import { LogIn, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    id: '',
    phone: ''
  });
  const [showId, setShowId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock verification delay
    setTimeout(() => {
      setIsLoading(false);
      router.push('/npl/dashboard');
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <NplLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-2">
            Login / Verify ID
          </h1>
          <p className="text-gray-600">
            Enter your Thai National ID and phone number to access your account.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Thai National ID */}
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-sam-text-primary mb-2">
                Thai National ID
              </label>
              <div className="relative">
                <input
                  type={showId ? "text" : "password"}
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="1234567890123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sam-primary focus:border-transparent pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowId(!showId)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showId ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-sam-text-primary mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="0812345678"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sam-primary hover:bg-[#005a42] disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Verify & Login</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo Info */}
        <div className="bg-sam-accent rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-sam-text-primary mb-2">
            Demo Information
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Demo ID:</strong> 1234567890123</p>
            <p><strong>Demo Phone:</strong> 0812345678</p>
            <p className="text-xs text-gray-500">
              Use any values to proceed to demo dashboard
            </p>
          </div>
        </div>

        {/* Alternative Actions */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => router.push('/npl/register')}
            className="w-full border border-sam-primary text-sam-primary font-medium py-3 px-4 rounded-lg hover:bg-sam-primary hover:text-white transition-colors duration-200"
          >
            New User? Register Here
          </button>
          
          <button
            onClick={() => router.push('/npl/contact')}
            className="w-full text-gray-600 font-medium py-2 px-4 rounded-lg hover:text-sam-primary transition-colors duration-200"
          >
            Need Help? Contact Support
          </button>
        </div>
      </div>
    </NplLayout>
  );
}
