import Image from "next/image";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
}

/** Full-height auth panel with background image, overlay, logo, and dynamic title. */
export default function AuthLayout({ title, subtitle }: AuthLayoutProps) {
  return (
    <aside className="relative w-full h-full min-h-screen">
      <Image
        src={"/images/auth-img.png"}
        alt="Kemet University"
        fill
        sizes="50vw"
        priority
        className="object-cover"
      />

      <div aria-hidden="true" className="bg-primary/90 absolute inset-0">
        <div className="p-8 md:p-12 lg:p-15">
          <Image
            src={"/images/logo.png"}
            alt="Kemet University Logo"
            priority  
            width={140}
            height={65}
            className="w-auto h-11 lg:h-15"
          />
          <div className="text-text-white pt-6 md:pt-10 lg:pt-15 space-y-4 md:space-y-6">
            <div>
              <h1 className="font-bold text-2xl sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              <div className="bg-text-peach w-13 h-0.5 mt-2"></div>
            </div>
            <p className="text-sm sm:text-base lg:text-lg">{subtitle}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
