'use client';

import { useState } from 'react';
import NplLayout from '@/components/NplLayout';
import { Calculator, DollarSign, Calendar, Percent, Clock } from 'lucide-react';

export default function DebtCalculatorPage() {
  const [formData, setFormData] = useState({
    totalDebt: '',
    interestRate: '',
    term: ''
  });
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalAmount: number;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePayment = () => {
    const principal = parseFloat(formData.totalDebt);
    const rate = parseFloat(formData.interestRate) / 100 / 12; // Monthly rate
    const months = parseInt(formData.term);

    if (principal && rate && months) {
      const monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / 
                            (Math.pow(1 + rate, months) - 1);
      const totalAmount = monthlyPayment * months;
      const totalInterest = totalAmount - principal;

      setResult({
        monthlyPayment,
        totalInterest,
        totalAmount
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <NplLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sam-text-primary mb-2">
            Debt Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your monthly installment based on debt amount, interest rate, and term.
          </p>
        </div>

        {/* Calculator Form */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h2 className="text-lg font-semibold text-sam-text-primary mb-4">
            Enter Your Details
          </h2>
          
          <div className="space-y-4">
            {/* Total Debt */}
            <div>
              <label htmlFor="totalDebt" className="block text-sm font-medium text-sam-text-primary mb-2">
                Total Debt Amount (THB)
              </label>
              <div className="relative">
                <DollarSign size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  id="totalDebt"
                  name="totalDebt"
                  value={formData.totalDebt}
                  onChange={handleInputChange}
                  placeholder="100000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <label htmlFor="interestRate" className="block text-sm font-medium text-sam-text-primary mb-2">
                Annual Interest Rate (%)
              </label>
              <div className="relative">
                <Percent size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  id="interestRate"
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleInputChange}
                  placeholder="12"
                  step="0.1"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Term */}
            <div>
              <label htmlFor="term" className="block text-sm font-medium text-sam-text-primary mb-2">
                Term (Months)
              </label>
              <div className="relative">
                <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  id="term"
                  name="term"
                  value={formData.term}
                  onChange={handleInputChange}
                  placeholder="24"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sam-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculatePayment}
              className="w-full bg-sam-primary hover:bg-[#005a42] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Calculator size={20} />
              <span>Calculate Payment</span>
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <h3 className="text-lg font-semibold text-sam-text-primary mb-4">
              Calculation Results
            </h3>
            
            <div className="space-y-4">
              {/* Monthly Payment */}
              <div className="bg-sam-accent rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-sam-primary mb-2">
                  {formatCurrency(result.monthlyPayment)}
                </div>
                <div className="text-sm text-gray-600">Monthly Payment</div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-sam-text-primary">
                    {formatCurrency(result.totalAmount)}
                  </div>
                  <div className="text-xs text-gray-600">Total Amount</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-red-600">
                    {formatCurrency(result.totalInterest)}
                  </div>
                  <div className="text-xs text-gray-600">Total Interest</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sample Calculations */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <h3 className="font-semibold text-sam-text-primary mb-3">
            Sample Calculations
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-2 bg-sam-accent rounded">
              <span>THB 100,000 for 24 months at 12%</span>
              <span className="font-semibold text-sam-primary">THB 4,707/month</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-sam-accent rounded">
              <span>THB 200,000 for 36 months at 15%</span>
              <span className="font-semibold text-sam-primary">THB 6,933/month</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-sam-accent rounded">
              <span>THB 500,000 for 48 months at 18%</span>
              <span className="font-semibold text-sam-primary">THB 15,000/month</span>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="bg-sam-accent rounded-lg p-4">
          <h3 className="font-semibold text-sam-text-primary mb-3">
            Important Information
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex items-start gap-2">
              <Clock size={16} className="text-sam-primary mt-0.5" />
              <span>Calculations are estimates only. Actual terms may vary.</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock size={16} className="text-sam-primary mt-0.5" />
              <span>Interest rates are subject to change based on credit assessment.</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock size={16} className="text-sam-primary mt-0.5" />
              <span>Contact our team for personalized debt restructuring options.</span>
            </div>
          </div>
        </div>
      </div>
    </NplLayout>
  );
}
