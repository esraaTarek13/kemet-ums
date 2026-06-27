import { Skeleton } from "./Skeleton";

export function ConversationSidebarSkeleton() {
  return (
    <aside className="w-full h-full lg:max-w-72.5 relative Custom-container pt-4">
      {/* Matches the decorative background in ConversationSidebar */}
      <div
        className="hidden lg:block bg-bg-navbar border-r border-bg-bar absolute top-0 bottom-0 right-0 -left-50 -z-10"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4 md:gap-6 w-full h-full">
        <Skeleton className="h-7 w-15 md:w-32" />
        <Skeleton className="h-9 w-full" />

        <ul className="space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="flex items-center gap-3 md:gap-4 p-5">
              <Skeleton className="h-1.5 w-1.5 rounded-full shrink-0" />
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between gap-2">
                  <Skeleton className="h-5 w-12 md:w-16" />
                  <Skeleton className="h-4 w-6 md:w-12" />
                </div>
                <Skeleton className="h-4 w-full" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
