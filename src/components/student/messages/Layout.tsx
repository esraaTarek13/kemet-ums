"use client";
import { usePathname } from "next/navigation";
import ConversationSidebar from "./ConversationSidebar";
import { useEffect } from "react";

const MESSAGES_ROOT_PATH = "/student/messages";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // True when a specific chat is selected (not on the messages root page)
  const hasSelectedChat = pathname !== MESSAGES_ROOT_PATH;

  // Add a class to the body when the messages page is active.
  // This lets us apply messages-specific styles (full height, no footer, no gap)
  // without touching the shared student layout.
  // The class is removed automatically when the user navigates away.
  useEffect(() => {
    document.body.classList.add("messages-page");
    return () => document.body.classList.remove("messages-page");
  }, []);

  return (
    <div className="flex h-full">
      {/* Sidebar: hidden on mobile when a chat is open, visible otherwise */}
      <div
        className={`${
          hasSelectedChat ? "hidden lg:block" : "block"
        } pl-6 h-full w-full lg:w-fit`}
      >
        <ConversationSidebar />
      </div>

      {/* Chat content: takes over the full screen on mobile when a chat is selected */}
      <div
        className={`${
          hasSelectedChat ? "block" : "hidden lg:block"
        } flex-1 h-full w-full grow`}
      >
        {children}
      </div>
    </div>
  );
}
