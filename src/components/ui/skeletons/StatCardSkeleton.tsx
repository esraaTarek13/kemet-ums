import { Skeleton } from "./Skeleton";

export default function StatCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <section
          key={i}
          className="h-25 lg:h-30 w-full card flex flex-col justify-between"
        >
          <Skeleton className="h-4 w-20" />
          <div className="flex items-center justify-between w-full">
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-6 w-5" />
          </div>
        </section>
      ))}
    </div>
  );
}