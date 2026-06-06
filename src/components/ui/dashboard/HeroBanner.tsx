"use client";
import { format } from "date-fns";
import { useAuthStore } from "@/stores/authStore";
import HeaderSkeleton from "../skeletons/HeaderSkeleton";

interface HeroBannerProps {
  subtle: string;
}

export default function HeroBanner({ subtle }: HeroBannerProps) {
  const { user, isLoading } = useAuthStore();

  const now = new Date();
  const day = format(now, "EEEE");
  const date = format(now, "MMMM d, yyyy");

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <section
      aria-label="Welcome banner"
      className="flex flex-col md:flex-row gap-3 md:justify-between md:items-end relative overflow-hidden bg-linear-to-r from-accent to-primary rounded-xl shadow-[0_0_5px_#4a1b26] p-4 md:p-6 lg:p-8"
    >
      <div
        aria-hidden="true"
        className="absolute right-0 -bottom-3.5 md:-bottom-3 h-[80%] w-30 lg:w-40 bg-[url('/images/mark-logo.png')] bg-no-repeat bg-center bg-contain opacity-10"
      />

      <div className="relative z-10 space-y-1 text-text-white">
        <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Welcome back, {user?.full_name || "User"}
        </h2>
        <p className="text-sm md:text-base lg:text-lg">{subtle}</p>
      </div>

      <time
        dateTime={now.toISOString().split("T")[0]}
        className="text-text-white"
      >
        <p className="text-[10px] md:text-xs lg:text-sm uppercase tracking-widest opacity-70 md:text-right">
          {day}
        </p>
        <p className="font-semibold md:text-lg lg:text-xl">{date}</p>
      </time>
    </section>
  );
}