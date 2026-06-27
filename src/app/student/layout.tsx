import StudentAside from "@/components/aside/portal-sidebars/StudentAside";
import Search from "@/components/student/search/Search";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { headers } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Student",
    default: "Student",
  },
};

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isMessagesPage = pathname.startsWith("/student/messages");

  return (
    <div className="min-h-screen flex">
      <StudentAside />
      <section className="flex flex-col gap-5 md:gap-6 flex-1 ml-16 md:ml-47 lg:ml-50">
        <Header search={<Search />} />
        <main className="grow">{children}</main>
        {!isMessagesPage && <Footer />}
      </section>
    </div>
  );
}
