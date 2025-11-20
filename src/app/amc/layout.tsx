import Link from 'next/link';
import Image from 'next/image';

export default function AmcLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sam-primary/10 to-sam-secondary/5">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/sam_logo.png"
              alt="SAM Logo"
              width={56}
              height={32}
              className="rounded-lg shadow-sm"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold text-sam-text-primary">SAM AMC</span>
              <span className="text-xs text-gray-500">Asset Management Company</span>
            </div>
          </Link>
          <div className="text-right text-xs text-gray-500">
            <p>โครงการปิดหนี้ไว ไปต่อได้</p>
            <p>โดย Sukhumvit Asset Management</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-24">{children}</main>
    </div>
  );
}

