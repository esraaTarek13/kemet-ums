"use client";
import { usePathname } from "next/navigation";
import ConversationSidebar from "./ConversationSidebar";

const MESSAGES_ROOT_PATH = "/student/messages";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // True when a specific chat is selected (not on the messages root page)
  const hasSelectedChat = pathname !== MESSAGES_ROOT_PATH;

  return (
    <div className="flex h-full">
      {/* Sidebar: hidden on mobile when a chat is open */}
      <div
        className={`${
          hasSelectedChat ? "hidden lg:block" : "block"
        } pl-6 h-full w-full lg:w-fit`}
      >
        <ConversationSidebar />
      </div>

      {/* Chat content: hidden on mobile until a chat is selected */}
      <div
        className={`${
          hasSelectedChat ? "block" : "hidden lg:block"
        } Custom-container flex-1 h-full w-full grow`}
      >
        {children}
      </div>
    </div>
  );
}
