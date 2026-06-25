import { Skeleton } from "./Skeleton";

export function NavbarSkeleton() {
  return (
    <div className="flex items-center gap-3 justify-end md:justify-between w-full px-6 py-3">
      {/* Search */}
      <Skeleton className="hidden md:block h-8 w-40 rounded-lg" />
      <Skeleton className="block md:hidden w-5 h-5 rounded-full" />

      {/* Bell + User */}
      <div className="flex items-center gap-3">
        <Skeleton className="w-5 h-5 rounded-full" />
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
