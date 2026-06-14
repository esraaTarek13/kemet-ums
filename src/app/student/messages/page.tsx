import { IoChatbubbleEllipses } from "react-icons/io5";

export default function MessagesPage() {
  return (
    <div className="flex flex-1 items-center justify-center h-full w-full">
      <p className="flex flex-col items-center gap-3 text-text-subtle">
        <IoChatbubbleEllipses
          className="text-5xl lg:text-8xl"
          aria-hidden="true"
        />
        <span className="lg:text-xl">Select a course to start chatting</span>
      </p>
    </div>
  );
}