"use client";

import { useRouter } from "next/navigation";

export default function Error({ reset }: { reset: () => void }) {
  const router = useRouter();

  return (
    <section className="Custom-container relative flex items-center justify-center h-screen">
      {/* Background 500 illustration */}
      <img
        src="/images/500.png"
        aria-hidden="true"
        className="w-80 sm:w-160 lg:w-213.75 object-contain opacity-10 absolute"
      />

      <div className="flex flex-col items-center justify-center relative z-50">
        {/* Logo */}
        <img src="/images/logo-dark.png" alt="Kemet University logo" />

        {/* Error message */}
        <div className="mt-5 md:mt-9 lg:mt-12 space-y-2 md:space-y-4">
          <h3 className="font-bold text-accent text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center">
            Something Went Wrong
          </h3>
          <p className="text-text-secondary text-base md:text-lg lg:text-xl text-center">
            An unexpected error occurred. Please try again later.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-12 md:mt-18 lg:mt-24">
          <button
            onClick={reset}
            type="button"
            aria-label="Try loading the page again"
            className="bg-accent text-text-white font-bold text-base md:text-lg py-1.5 md:py-2.5 px-5 md:px-8 rounded-sm cursor-pointer"
          >
            Try Again
          </button>
          <button
            onClick={() => router.back()}
            type="button"
            aria-label="Go back to the previous page"
            className="font-bold text-base md:text-lg text-accent py-1.5 md:py-2.5 px-5 md:px-8 border border-accent/20 rounded-sm cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
}
