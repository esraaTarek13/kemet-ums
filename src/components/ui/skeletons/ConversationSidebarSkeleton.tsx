import { Skeleton } from "./Skeleton";

export function ConversationSidebarSkeleton() {
  return (
    <aside className="h-full w-full lg:w-72.5 relative pr-4">
      <div
        className="w-125 hidden lg:block bg-bg-navbar border-r border-bg-bar fixed top-0 bottom-18.75 right-0 -left-3.75 -z-10"
        aria-hidden="true"
      />
      <div className="space-y-4 md:space-y-6">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-9 w-full" />

        <ul className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="flex items-center gap-3 md:gap-4 p-5">
              <Skeleton className="h-1.5 w-1.5 rounded-full shrink-0" />
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-4 w-40" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
