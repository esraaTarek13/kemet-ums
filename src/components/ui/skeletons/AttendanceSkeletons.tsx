import { Skeleton } from "@/components/ui/skeletons/Skeleton";

export default function AttendanceSkeletons() {
  return (
    <section className="card space-y-1.5 lg:space-y-2.5">
      <Skeleton className="w-35 h-6" />
      <div className="flex flex-col items-end gap-1">
        <Skeleton className="w-8 h-4" />
        <Skeleton className="w-full h-2 rounded-full" />
      </div>
    </section>
  );
}
