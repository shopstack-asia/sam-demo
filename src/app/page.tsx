import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sam-primary to-sam-secondary flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* SAM Logo */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-sam-text-light mb-2">SAM</h1>
          <p className="text-sam-text-light text-lg opacity-90">
            Sukhumvit Asset Management
          </p>
        </div>

        {/* Selection Buttons */}
        <div className="space-y-4">
          <Link
            href="/npa"
            className="block w-full bg-sam-primary hover:bg-[#005a42] text-sam-text-light font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="text-xl mb-1">NPA</div>
            <div className="text-sm opacity-90">Non-Performing Asset</div>
          </Link>

          <Link
            href="/npl"
            className="block w-full bg-sam-secondary hover:bg-[#009973] text-sam-text-light font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="text-xl mb-1">NPL</div>
            <div className="text-sm opacity-90">Non-Performing Loan</div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 text-sam-text-light text-sm opacity-75">
          <p>Choose your service to continue</p>
        </div>
      </div>
    </div>
  );
}