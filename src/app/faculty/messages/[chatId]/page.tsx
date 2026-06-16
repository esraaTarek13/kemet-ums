import ChatPage from "@/components/faculty/messages/ChatPage";

export default async function ChatId({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;

  return <ChatPage chatId={chatId} />;
}