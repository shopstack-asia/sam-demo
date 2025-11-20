'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

import AmcHero from '@/components/amc/AmcHero';

export default function AmcThankYouPage() {
  return (
    <div className="py-6 space-y-6">
      <AmcHero />

      <section className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-sam-secondary flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-sam-text-primary">ระบบได้รับข้อมูลของท่านเรียบร้อยแล้ว</h1>
        <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
          ข้อมูลของท่านถูกบันทึกไว้ในระบบเรียบร้อยแล้ว ทางเจ้าหน้าที่จะนำข้อมูลนี้ไปใช้ในการตรวจสอบร่วมกับข้อมูลจาก BOT
          และจะแจ้งผลให้ท่านทราบเมื่อมีความคืบหน้า
        </p>
        <div className="space-y-3 pt-2 hidden">
          <Link
            href="/npl"
            className="block w-full rounded-2xl bg-sam-secondary text-white font-semibold py-3 px-4 hover:bg-emerald-600 transition"
          >
            กลับไปหน้าหลัก NPL
          </Link>
          <Link
            href="/amc/privacy"
            className="block w-full rounded-2xl border border-gray-200 text-sam-text-primary font-semibold py-3 px-4 hover:bg-gray-50 transition"
          >
            ส่งข้อมูลเพิ่มเติม
          </Link>
        </div>
      </section>
    </div>
  );
}
