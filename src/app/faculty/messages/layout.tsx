import Layout from "@/components/faculty/messages/Layout";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
   <Layout>{children}</Layout>
  );
}