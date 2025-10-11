'use client';

import NplLayout from '@/components/NplLayout';
import { QrCode, Calculator, Calendar, DollarSign, AlertCircle, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [showQrDrawer, setShowQrDrawer] = useState(false);
  
  const mockUser = {
    name: "Somrak Thawan",
    outstanding_balance: 9000,
    due_date: "2025-11-15",
    last_payment: "2025-09-15",
    total_paid: 52000,
    monthly_installment: 3500,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };


  return (
    <NplLayout>
      <div className="p-4">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
          <h1 className="text-xl font-bold text-sam-text-primary mb-2">
            Welcome, {mockUser.name}
          </h1>
          <p className="text-gray-600 text-sm">
            Manage your debt status and payments
          </p>
        </div>

        {/* Debt Summary Card */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-sam-text-primary">
              Debt Summary
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-sam-primary" />
              <span>Due: {formatDate(mockUser.due_date)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {formatCurrency(mockUser.outstanding_balance)}
              </div>
              <div className="text-sm text-gray-600">Outstanding Balance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formatCurrency(mockUser.total_paid)}
              </div>
              <div className="text-sm text-gray-600">Total Paid</div>
            </div>
          </div>

          <div className="bg-sam-accent rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Monthly Installment</div>
                <div className="text-lg font-semibold text-sam-text-primary">
                  {formatCurrency(mockUser.monthly_installment)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Last Payment</div>
                <div className="text-sm font-medium text-sam-text-primary">
                  {formatDate(mockUser.last_payment)}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setShowQrDrawer(true)}
              className="flex items-center justify-center gap-2 bg-sam-primary hover:bg-[#005a42] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <QrCode size={20} />
              <span>QR</span>
            </button>
            <Link
              href="/npl/loan-plan"
              className="flex items-center justify-center gap-2 bg-sam-secondary hover:bg-[#008f6f] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <Calculator size={20} />
              <span>View Plan</span>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-semibold text-sam-text-primary mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/npl/document-management"
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <DollarSign size={16} />
              <span>Documents</span>
            </Link>
            <Link
              href="/npl/contact"
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <AlertCircle size={16} />
              <span>Get Help</span>
            </Link>
          </div>
        </div>

        {/* QR Payment Drawer */}
        {showQrDrawer && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black" style={{opacity: 0.5}} onClick={() => setShowQrDrawer(false)}></div>
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto">
              <div className="p-6 pb-20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-sam-text-primary">QR Payment</h3>
                  <button 
                    onClick={() => setShowQrDrawer(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

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
                  <div className="text-center">
                    <button className="text-sam-primary hover:text-[#005a42] font-medium text-sm underline">
                      Download QR
                    </button>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="space-y-4 mb-6">
                  <div className="bg-sam-accent rounded-lg p-4">
                    <h4 className="font-semibold text-sam-text-primary mb-3">Payment Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Installment Amount:</span>
                        <span className="font-semibold text-sam-text-primary">
                          {formatCurrency(mockUser.monthly_installment)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-semibold text-sam-text-primary">
                          {formatDate(mockUser.due_date)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Outstanding Balance:</span>
                        <span className="font-semibold text-red-600">
                          {formatCurrency(mockUser.outstanding_balance)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Payment Instructions</h4>
                    <ol className="text-sm text-blue-700 space-y-1">
                      <li>1. Scan the QR code with your mobile banking app</li>
                      <li>2. Enter the payment amount: {formatCurrency(mockUser.monthly_installment)}</li>
                      <li>3. Confirm the payment details</li>
                      <li>4. Complete the transaction</li>
                    </ol>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </NplLayout>
  );
}
