import { Skeleton } from "@/components/ui/skeletons/Skeleton";

interface StatCardSkeletonProps {
  length?: number;
}

export default function DueSoonSkeleton({ length = 1 }: StatCardSkeletonProps) {
  return (
    <>
      {Array.from({ length }).map((_, i) => (
        <section key={i} className="card h-30 rounded-xl flex gap-4">
          <Skeleton className="h-10 w-10 rounded-xl bg-bg-bar" />
          <div className="w-full">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-full mt-1" />
            <div className="w-full flex justify-between items-center mt-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
