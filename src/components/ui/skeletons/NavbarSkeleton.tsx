import { Skeleton } from "./Skeleton";

export function NavbarSkeleton() {
  return (
    <div className="h-20 border-b border-bg-bar flex items-center gap-3 justify-end md:justify-between w-full px-6">
      {/* Search */}
      <Skeleton className="hidden md:block h-8 w-40 rounded-lg" />

      {/* Bell + User */}
      <div className="flex items-center gap-3">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="w-5 h-5 rounded-full" />
        <div className="flex items-center gap-3">
          <Skeleton className="w-7 md:w-9 h-7 md:h-9 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-18 md:w-24" />
            <Skeleton className="h-2 w-20 md:w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
