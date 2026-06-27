import Layout from "@/components/student/messages/Layout";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <Layout>{children}</Layout>;
}