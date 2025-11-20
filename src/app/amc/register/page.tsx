'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import AmcHero from '@/components/amc/AmcHero';
import AmcStepIndicator from '@/components/amc/AmcStepIndicator';
import { formFields } from '../constants';

export default function AmcRegisterPage() {
  const [formState, setFormState] = useState<Record<string, string>>({});
  const router = useRouter();

  const canSubmit = useMemo(() => {
    return formFields.every((field) => (formState[field.id]?.length ?? 0) > 0);
  }, [formState]);

  return (
    <div className="py-6 space-y-6">
      <AmcHero />
      <AmcStepIndicator currentStep={2} />

      <section className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-sam-text-primary">สมัครเข้าร่วมโครงการ</h2>
            <p className="text-sm text-gray-600">กรุณากรอกข้อมูลให้ครบถ้วน</p>
          </div>
          <Link
            href="/amc/privacy"
            className="text-sm text-sam-secondary font-semibold underline-offset-4 hover:underline"
          >
            ย้อนกลับไปดู Privacy Notice
          </Link>
        </div>

        <div className="mt-5 space-y-4">
          {formFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label htmlFor={field.id} className="text-sm font-medium text-sam-text-primary">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <input
                id={field.id}
                type={field.type ?? 'text'}
                placeholder={field.placeholder}
                value={formState[field.id] ?? ''}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    [field.id]: event.target.value
                  }))
                }
                className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm focus:border-sam-secondary focus:ring-2 focus:ring-sam-secondary/20"
              />
            </div>
          ))}
        </div>

        <button
          className={`mt-6 w-full rounded-2xl py-4 text-base font-semibold text-white shadow-lg transition ${
            canSubmit ? 'bg-sam-primary hover:bg-emerald-700' : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={!canSubmit}
          onClick={() => {
            if (canSubmit) {
              router.push('/amc/thank-you');
            }
          }}
        >
          ส่งข้อมูลสมัครเข้าร่วมโครงการ
        </button>
      </section>
    </div>
  );
}

