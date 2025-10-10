'use client';

import NpaLayout from '@/components/NpaLayout';
import Image from 'next/image';
import { QrCode, Download, Phone } from 'lucide-react';

export default function PaymentPage() {
  const handleSaveQR = () => {
    // In a real app, this would save the QR code
    alert('QR Code saved to your device!');
  };

  return (
    <NpaLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-2">
            Deposit Payment
          </h1>
          <p className="text-gray-600">
            Scan the QR code below to make your deposit payment.
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <div className="text-center">
            {/* QR Code */}
            <div className="mb-6">
              <div className="w-64 h-64 mx-auto bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center p-4">
                <Image
                  src="https://quickchart.io/qr?text=Pay%20THB%2050000%20to%20Sukhumvit%20Asset%20Management%20Co.%2C%20Ltd.%20Reference%3A%20Deposit%20for%20Condo%20Sukhumvit%2039&size=200&format=png"
                  alt="Payment QR Code"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-3 mb-6">
              <div className="text-2xl font-bold text-sam-text-primary">
                Pay THB 50,000
              </div>
              <div className="text-gray-600">
                to Sukhumvit Asset Management Co., Ltd.
              </div>
              <div className="text-sm text-gray-500">
                Reference: Deposit for Condo Sukhumvit 39
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleSaveQR}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <Download size={20} />
                <span>Save QR Code</span>
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <QrCode size={20} />
                <span>Generate New QR Code</span>
              </button>
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-sam-accent rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-sam-text-primary mb-3">
            Payment Instructions
          </h3>
          <ol className="text-sm text-gray-600 space-y-2">
            <li>1. Open your mobile banking app</li>
            <li>2. Scan the QR code above</li>
            <li>3. Enter the amount: THB 50,000</li>
            <li>4. Add reference: "Deposit for Condo Sukhumvit 39"</li>
            <li>5. Complete the payment</li>
            <li>6. Keep the payment receipt for your records</li>
          </ol>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-semibold text-sam-text-primary mb-3">
            Need Help?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            If you encounter any issues with the payment, please contact us:
          </p>
          
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              <Phone size={16} />
              <span>Contact us on Line</span>
            </button>
            
            <div className="text-center text-sm text-gray-500">
              <p>Phone: +66 2 686 1888</p>
              <p>Email: info@sam.co.th</p>
            </div>
          </div>
        </div>
      </div>
    </NpaLayout>
  );
}
