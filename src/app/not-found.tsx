"use client";

import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";

export default function NotFound() {
  const router = useRouter();
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/";

  return (
    <section className="Custom-container relative flex items-center justify-center h-screen">
      {/* Background 404 illustration */}
      <div className="w-80 sm:w-160 lg:w-213.75 h-40 sm:h-80 lg:h-107 absolute opacity-15">
        <Image
          src="/images/404.png"
          alt="404"
          aria-hidden="true"
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col items-center justify-center relative z-50">
        {/* Logo */}

        <Image
          src="/images/logo-dark.png"
          alt="Kemet University logo"
          width={100}
          height={80}
          className="w-20 md:w-30 h-auto object-contain"
        />

        {/* Error message */}
        <div className="mt-5 md:mt-9 lg:mt-12 space-y-2 md:space-y-4">
          <h3 className="font-bold text-accent text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center">
            Page Not Found
          </h3>
          <p className="text-text-secondary text-base md:text-lg lg:text-xl text-center">
            The page you&rsquo;re looking for could not be found.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-12 md:mt-18 lg:mt-24">
          <Link
            href={`${base}/dashboard`}
            aria-label="Go back to your dashboard"
            className="flex items-center justify-center gap-2 bg-accent text-text-white py-1.5 md:py-2.5 px-5 md:px-8 rounded-sm"
          >
            <MdDashboard
              aria-hidden="true"
              className="text-lg md:text-xl shrink-0"
            />
            <span className="font-bold text-base md:text-lg">
              Back to Dashboard
            </span>
          </Link>
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
