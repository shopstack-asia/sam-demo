'use client';

import NplLayout from '@/components/NplLayout';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoanPlanPage() {
  const mockLoanDetails = [
    {
      id: 1,
      loanAmount: 150000,
      interestRate: 6.5,
      outstandingBalance: 9000,
      monthlyInstallment: 3500,
      dueDate: "2025-11-15",
      overdueAmount: 0,
      interestAccrued: 12320,
      totalInterestPaid: 12000,
      loanStatus: "Active",
      contractNumber: "NPL-2024-001234",
      startDate: "2020-01-15",
      termMonths: 60,
      remainingMonths: 3,
      totalPaid: 141000,
      nextPaymentDate: "2025-11-15"
    },
    {
      id: 2,
      loanAmount: 80000,
      interestRate: 7.2,
      outstandingBalance: 25000,
      monthlyInstallment: 2200,
      dueDate: "2025-12-20",
      overdueAmount: 0,
      interestAccrued: 120,
      totalInterestPaid: 8000,
      loanStatus: "Active",
      contractNumber: "NPL-2023-005678",
      startDate: "2021-06-20",
      termMonths: 48,
      remainingMonths: 8,
      totalPaid: 55000,
      nextPaymentDate: "2025-12-20"
    },
    {
      id: 3,
      loanAmount: 200000,
      interestRate: 5.8,
      outstandingBalance: 45000,
      monthlyInstallment: 4200,
      dueDate: "2025-10-30",
      overdueAmount: 2100,
      interestAccrued: 85,
      totalInterestPaid: 18000,
      loanStatus: "Overdue",
      contractNumber: "NPL-2022-003456",
      startDate: "2019-03-10",
      termMonths: 72,
      remainingMonths: 12,
      totalPaid: 155000,
      nextPaymentDate: "2025-10-30"
    }
  ];

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
      <div className="p-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/npl/dashboard"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold text-sam-text-primary">Loan Contracts</h1>
        </div>

        {/* Total Summary */}
        <div className="bg-gradient-to-r from-sam-primary to-sam-secondary rounded-xl p-6 mb-6 text-white">
          <h2 className="text-lg font-bold mb-4">Total Summary</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-sm opacity-90">Total Outstanding</div>
              <div className="text-xl font-bold">
                {formatCurrency(mockLoanDetails.reduce((sum, loan) => sum + loan.outstandingBalance, 0))}
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-sm opacity-90">Monthly Payment</div>
              <div className="text-xl font-bold">
                {formatCurrency(mockLoanDetails.reduce((sum, loan) => sum + loan.monthlyInstallment, 0))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-xs opacity-90">Total Paid</div>
              <div className="text-sm font-semibold">
                {formatCurrency(mockLoanDetails.reduce((sum, loan) => sum + loan.totalPaid, 0))}
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-xs opacity-90">Interest</div>
              <div className="text-sm font-semibold">
                {formatCurrency(mockLoanDetails.reduce((sum, loan) => sum + loan.totalInterestPaid, 0))}
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-xs opacity-90">Penalty</div>
              <div className="text-sm font-semibold">
                {formatCurrency(mockLoanDetails.reduce((sum, loan) => sum + loan.interestAccrued, 0))}
              </div>
            </div>
          </div>
        </div>

        {/* Loan Contracts List */}
        <div className="space-y-4 mb-6">
          {mockLoanDetails.map((loan) => (
            <div key={loan.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sam-text-primary">Contract #{loan.contractNumber}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  loan.loanStatus === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : loan.loanStatus === 'Overdue'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {loan.loanStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600">Original Amount</span>
                  <p className="font-bold text-sam-text-primary">{formatCurrency(loan.loanAmount)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Interest Rate</span>
                  <p className="font-bold text-sam-text-primary">{loan.interestRate}%</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Outstanding Balance</span>
                  <p className="font-bold text-red-600">{formatCurrency(loan.outstandingBalance)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Monthly Installment</span>
                  <p className="font-bold text-sam-text-primary">{formatCurrency(loan.monthlyInstallment)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-sm text-gray-600">Next Payment</span>
                  <p className="text-sm font-medium text-sam-text-primary">{formatDate(loan.nextPaymentDate)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Remaining</span>
                  <p className="text-sm font-medium text-sam-text-primary">{loan.remainingMonths} months</p>
                </div>
              </div>

              {loan.overdueAmount > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-red-700 font-medium">Overdue Amount</span>
                    <span className="font-bold text-red-600">{formatCurrency(loan.overdueAmount)}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="text-gray-600">Total Paid: </span>
                  <span className="font-medium text-green-600">{formatCurrency(loan.totalPaid)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Interest: </span>
                  <span className="font-medium text-orange-600">{formatCurrency(loan.interestAccrued)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </NplLayout>
  );
}
