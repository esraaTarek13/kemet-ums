import Search from "@/components/admin/search/Search";
import SuperAdminAside from "@/components/aside/portal-sidebars/SuperAdminAside";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Super Admin",
    default: "Super Admin",
  },
};

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <SuperAdminAside />
      <section className="flex flex-col gap-5 md:gap-6 flex-1 ml-16 md:ml-46 lg:ml-50">
        <Header search={<Search />} />
        <main className="Custom-container grow flex flex-col gap-5 md:gap-6">
          {children}
        </main>
        <Footer />
      </section>
    </div>
  );
}
