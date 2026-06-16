import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import ProfileAvatarMenu from "./ProfileAvatarMenu";

interface ProfileBannerProps {
  name: string;
  Id: string;
  department: string;
  year?: string;
  rank?: string;
  avatarUrl: string | null;
}

export default function ProfileBanner({
  name,
  Id,
  department,
  year,
  rank,
  avatarUrl,
}: ProfileBannerProps) {
  return (
    <section className="card relative" aria-label="Welcome banner">
      {/* Decorative bg logo — hidden on mobile to avoid clutter */}
      <div
        aria-hidden="true"
        className="hidden sm:block absolute right-2 sm:-bottom-4 lg:-bottom-2 h-[80%] w-30 lg:w-40 bg-[url('/images/mark-logo.png')] bg-no-repeat bg-center bg-contain mix-blend-luminosity brightness-90"
      />

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 md:gap-8">
        <div className="relative">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={`${name}'s profile picture`}
              width={100}
              height={100}
              priority
              className="rounded-full object-cover w-25 h-25"
            />
          ) : (
            // role="img" + aria-label exposes this as an accessible image fallback
            <span role="img" aria-label={`${name}'s profile picture`}>
              <FaUserCircle
                aria-hidden="true"
                className="text-bg-bar text-8xl shrink-0"
              />
            </span>
          )}

          <ProfileAvatarMenu hasAvatar={!!avatarUrl} />
        </div>

        <div className="text-center sm:text-start">
          <h3 className="header-title">{name}</h3>
          <p className="text-text-secondary/70 text-xs md:text-base">{Id}</p>
          <div className="flex gap-3 items-center flex-wrap mt-2.5">
            <p className="bg-[#F5F0E8] py-1 px-3 rounded-lg text-primary text-xs md:text-sm">
              {department}
            </p>
            {(year || rank) && (
              <p className="text-text-secondary text-xs md:text-base">
                {[year, rank].filter(Boolean).join(" | ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
