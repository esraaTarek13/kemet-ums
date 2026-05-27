import { Skeleton } from "@/components/ui/skeletons/Skeleton";

/* Chart */
export function EnrollmentSkeleton() {
  return (
    <section className="w-full min-h-50 md:min-h-62 lg:min-h-75 bg-bg-card rounded-xl p-4 lg:p-6 space-y-4 lg:space-y-6">
      <div className="relative w-full h-62.5 overflow-hidden">
        <Skeleton className="absolute bottom-8 w-full h-28 rounded-xl" />
        <div className="absolute bottom-0 w-full flex justify-between px-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-2 w-14" />
          ))}
        </div>
      </div>
    </section>
  );
}
