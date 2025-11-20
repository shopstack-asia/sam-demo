'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

import AmcHero from '@/components/amc/AmcHero';
import AmcStepIndicator from '@/components/amc/AmcStepIndicator';
import { privacySections } from '../constants';

export default function AmcPrivacyPage() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <div className="py-6 space-y-6">
      <AmcHero />
      <AmcStepIndicator currentStep={1} />

      <section className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-sam-secondary font-semibold">
                Privacy Notice
              </p>
              <h2 className="text-xl font-bold text-sam-text-primary">ข้อกำหนดและเงื่อนไข</h2>
            </div>
            <CheckCircle2 className={`w-8 h-8 ${acceptedTerms ? 'text-sam-secondary' : 'text-gray-300'}`} />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 h-64 overflow-y-auto space-y-6 text-sm leading-6 text-gray-700">
            {privacySections.map((section) => (
              <div key={section.title}>
                <p className="font-semibold text-sam-text-primary">{section.title}</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  {section.body.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <label className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 rounded border-gray-300 text-sam-secondary focus:ring-sam-secondary"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
            />
            <span className="text-sm text-gray-700">
              ข้าพเจ้ายอมรับข้อกำหนดและเงื่อนไขในการใช้งานบริการทั้งหมด
            </span>
          </label>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link
            href="/"
            className="w-full rounded-xl border border-gray-200 py-3 text-center text-gray-600 font-semibold hover:bg-gray-50 transition"
          >
            ยกเลิก
          </Link>
          <Link
            href={acceptedTerms ? '/amc/register' : '#'}
            className={`w-full rounded-xl py-3 text-center font-semibold text-white transition ${
              acceptedTerms ? 'bg-sam-secondary hover:bg-emerald-600' : 'bg-gray-300 cursor-not-allowed pointer-events-none'
            }`}
            aria-disabled={!acceptedTerms}
          >
            ถัดไป
          </Link>
        </div>
      </section>
    </div>
  );
}

