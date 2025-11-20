import Image from 'next/image';
import React from 'react';

export default function AmcHero() {
  return (
    <section className="bg-white rounded-3xl p-5 shadow-lg overflow-hidden border border-sam-primary/10">
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-sam-secondary">
          Thailand AMC
        </span>
        <h1 className="text-3xl font-black leading-tight text-sam-text-primary">
          โครงการ <span className="text-sam-secondary">ปิดหนี้ไว</span> ไปต่อได้
        </h1>
        <p className="text-sm text-gray-600">
          โปรแกรมพิเศษช่วยลูกหนี้ปรับโครงสร้างและปิดบัญชีเร็วขึ้น พร้อมเปิดโอกาสทางการเงินใหม่ให้คุณก้าวต่ออย่างมั่นใจ
        </p>
      </div>
      <div className="mt-4 rounded-3xl overflow-hidden shadow-lg bg-white">
        <Image
          src="/amc_banner.png"
          alt="AMC Banner โครงการปิดหนี้ไว ไปต่อได้"
          width={1240}
          height={520}
          sizes="(max-width: 640px) 100vw, 640px"
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </section>
  );
}

