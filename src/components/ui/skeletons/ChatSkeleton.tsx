import { Skeleton } from "./Skeleton";

export function ChatSkeleton() {
  return (
    <section className="flex flex-col h-full w-full">
      {/* Header skeleton */}
      <div className="p-4 border-b border-bg-bar space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-50" />
      </div>

      {/* Messages skeleton */}
      <div className="grow py-8 pl-6 overflow-y-auto space-y-4 md:space-y-6">
        {[...Array(5)].map((_, i) => {
          const isMine = i % 2 !== 0;
          return (
            <div
              key={i}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${isMine ? "flex-row-reverse" : ""}`}
              >
                <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                <div
                  className={`${isMine ? "items-end" : "items-start"} flex flex-col gap-1.5 min-w-0`}
                >
                  <Skeleton className="h-3 w-16" />
                  <Skeleton
                    className={`h-12 ${i % 3 === 0 ? "w-48" : "w-64"} rounded-2xl ${
                      isMine ? "rounded-tr-none" : "rounded-tl-none"
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input skeleton */}
      <div className="p-4 border-t border-bg-bar">
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </section>
  );
}
