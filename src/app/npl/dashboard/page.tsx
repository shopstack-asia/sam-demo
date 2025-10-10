'use client';

import NplLayout from '@/components/NplLayout';
import { QrCode, Calculator, Calendar, DollarSign, History, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
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
            <button className="flex items-center justify-center gap-2 bg-sam-primary hover:bg-[#005a42] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
              <QrCode size={20} />
              <span>Pay via QR</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-sam-secondary hover:bg-[#008f6f] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
              <Calculator size={20} />
              <span>View Plan</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-semibold text-sam-text-primary mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
              <DollarSign size={16} />
              <span>Documents</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
              <AlertCircle size={16} />
              <span>Get Help</span>
            </button>
          </div>
        </div>
      </div>
    </NplLayout>
  );
}
