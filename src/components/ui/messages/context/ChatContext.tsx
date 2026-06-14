"use client";

import { createContext, useContext, ReactNode } from "react";

interface ChatContextValue {
  courseId: string;
  portal: "student" | "faculty";
}
interface ChatProviderProps extends ChatContextValue {
  children: ReactNode;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ courseId, portal, children }: ChatProviderProps) {
  return (
    <ChatContext.Provider value={{ courseId, portal }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within a ChatProvider");
  return ctx;
}