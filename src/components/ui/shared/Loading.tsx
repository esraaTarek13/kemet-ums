import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="relative w-16 md:w-20 h-13">
        <Image
          alt="Loading"
          src="/images/loading-logo.png"
          fill
          className="object-contain"
        />

        <div className="absolute inset-0 overflow-hidden animate-fill [clip-path:inset(100%_0_0_0)]">
          <Image
            alt="Loading"
            src="/images/loading-logo.png"
            fill
            className="object-contain brightness-0 saturate-100 invert-75 sepia-10 hue-rotate-10"
          />
        </div>
      </div>
    </div>
  );
}
