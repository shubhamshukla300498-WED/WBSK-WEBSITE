import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-espresso-900 flex items-center justify-center px-6">
      <div className="text-center">
        <span className="text-[120px] lg:text-[200px] font-display font-bold text-cream-50/5 leading-none block">
          404
        </span>
        <h1 className="font-display text-3xl lg:text-4xl text-cream-50 font-bold -mt-16 lg:-mt-24 relative z-10">
          Page Not Found
        </h1>
        <p className="text-cream-200/50 font-body text-lg mt-4 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
