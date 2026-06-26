import FacultyAside from "@/components/aside/portal-sidebars/FacultyAside";
import Search from "@/components/faculty/search/Search";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Faculty",
    default: "Faculty",
  },
};

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <FacultyAside />
      <section className="flex flex-col gap-5 md:gap-6 flex-1 ml-16 md:ml-47 lg:ml-50">
        <Header search={<Search />} />
        <main className="grow">{children}</main>
        <Footer />
      </section>
    </div>
  );
}
