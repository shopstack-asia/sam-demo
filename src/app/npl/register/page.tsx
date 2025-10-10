'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NplLayout from '@/components/NplLayout';
import { User, Upload, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    citizenId: '',
    phone: '',
    email: '',
    occupation: '',
    monthlyIncome: ''
  });
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock registration delay
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      // Auto redirect after success
      setTimeout(() => {
        router.push('/npl/dashboard');
      }, 2000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (showSuccess) {
    return (
      <NplLayout>
        <div className="p-4">
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="mb-4">
              <CheckCircle size={64} className="text-green-500 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-sam-text-primary mb-2">
              Registration Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Your application has been received. We will review your documents and contact you soon.
            </p>
            <div className="text-sm text-gray-500">
              Redirecting to dashboard...
            </div>
          </div>
        </div>
      </NplLayout>
    );
  }

  return (
    <NplLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-2">
            Register for Debt Clinic
          </h1>
          <p className="text-gray-600">
            Complete the form below to apply for debt clinic services.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-sam-text-primary mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Somsak Thawan"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                required
              />
            </div>

            {/* Citizen ID */}
            <div>
              <label htmlFor="citizenId" className="block text-sm font-medium text-sam-text-primary mb-2">
                Thai National ID
              </label>
              <input
                type="text"
                id="citizenId"
                name="citizenId"
                value={formData.citizenId}
                onChange={handleInputChange}
                placeholder="1234567890123"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-sam-text-primary mb-2">
                Mobile Number
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

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-sam-text-primary mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="somrak@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                required
              />
            </div>

            {/* Occupation */}
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-sam-text-primary mb-2">
                Current Occupation
              </label>
              <select
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                required
              >
                <option value="">Select Occupation</option>
                <option value="employee">Employee</option>
                <option value="business">Business Owner</option>
                <option value="freelancer">Freelancer</option>
                <option value="retired">Retired</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </div>

            {/* Monthly Income */}
            <div>
              <label htmlFor="monthlyIncome" className="block text-sm font-medium text-sam-text-primary mb-2">
                Monthly Income (THB)
              </label>
              <input
                type="number"
                id="monthlyIncome"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleInputChange}
                placeholder="25000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                required
              />
            </div>

            {/* Document Upload */}
            <div>
              <label className="block text-sm font-medium text-sam-text-primary mb-2">
                Upload Documents
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={32} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop files here, or click to select
                </p>
                <button
                  type="button"
                  className="text-sam-primary font-medium text-sm hover:underline"
                >
                  Choose Files
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Supported: PDF, JPG, PNG (Max 10MB each)
                </p>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreed"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 text-sam-primary border-gray-300 rounded focus:ring-sam-primary"
                required
              />
              <label htmlFor="agreed" className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-sam-primary hover:underline">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-sam-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !agreed}
              className="w-full bg-sam-primary hover:bg-[#005a42] disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <User size={20} />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Help Section */}
        <div className="bg-sam-accent rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-sam-text-primary mb-2">
            Need Help?
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            If you have questions about the registration process, please contact us:
          </p>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Phone:</strong> 02-686-1888</p>
            <p><strong>Email:</strong> info@sam.co.th</p>
            <p><strong>LINE:</strong> @samasset</p>
          </div>
        </div>
      </div>
    </NplLayout>
  );
}
