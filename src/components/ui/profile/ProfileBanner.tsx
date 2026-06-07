import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";

interface ProfileBannerProps {
  name: string;
  studentId: string;
  department: string;
  year: string;
  avatarUrl: string | null;
}

export default function ProfileBanner({
  name,
  studentId,
  department,
  year,
  avatarUrl,
}: ProfileBannerProps) {
  return (
    <section className="card relative" aria-label="Welcome banner">
      {/* Decorative bg logo — hidden on mobile to avoid clutter */}
      <div
        aria-hidden="true"
        className="hidden sm:block absolute right-2 -bottom-12 sm:-bottom-2 md:-bottom-3 lg:-bottom-2 h-[80%] w-30 lg:w-40 bg-[url('/images/mark-logo.png')] bg-no-repeat bg-center bg-contain mix-blend-luminosity brightness-90"
      />

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 md:gap-8">
        <div className="relative">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={`${name}'s profile picture`}
              width={68}
              height={68}
              priority
              className="rounded-full object-cover w-16 h-16"
            />
          ) : (
            <FaUserCircle
              aria-hidden="true"
              className="text-[#F5F3F0] text-8xl shrink-0"
            />
          )}

          <button
            aria-label="Edit profile picture"
            className="absolute -right-2 bottom-0 z-50 bg-primary border-4 border-bg-card p-2 rounded-full"
          >
            <LuPencil
              aria-hidden="true"
              className="shrink-0 text-text-white text-xl"
            />
          </button>
        </div>

        <div className="text-center sm:text-start">
          <h3 className="header-title">{name}</h3>
          <p className="text-text-secondary/70 text-xs md:text-base">
            {studentId}
          </p>
          <div className="flex gap-3 items-center flex-wrap mt-2.5">
            <p className="bg-[#F5F0E8] py-1 px-3 rounded-lg text-primary text-xs md:text-sm">
              {department}
            </p>
            <p className="text-text-secondary text-xs md:text-base">{year}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
