import Search from "@/components/admin/search/Search";
import AdminAside from "@/components/layout/aside/portal-sidebars/AdminAside";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin",
    default: "Admin",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <AdminAside />
      <section className="flex flex-col gap-5 md:gap-6 flex-1 ml-16 md:ml-47 lg:ml-50">
        <Header search={<Search />} />
        <main className="grow">
          {children}
        </main>
        <Footer />
      </section>
    </div>
  );
}
