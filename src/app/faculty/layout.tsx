import FacultyAside from "@/components/layout/aside/portal-sidebars/FacultyAside";
import Search from "@/components/faculty/search/Search";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { headers } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Faculty",
    default: "Faculty",
  },
};

export default async function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isMessagesPage = pathname.startsWith("/faculty/messages");

  return (
    <div className="min-h-screen flex">
      <FacultyAside />
      <section className="flex flex-col gap-5 md:gap-6 flex-1 ml-16 md:ml-41.5 lg:ml-44.5">
        <Header search={<Search />} />
        <main className="grow">{children}</main>
        {!isMessagesPage && <Footer />}
      </section>
    </div>
  );
}
