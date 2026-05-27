import { Skeleton } from "./Skeleton";

interface StatCardSkeletonProps {
  length?: number;
}

export default function CourseCardSkeleton({
  length = 1,
}: StatCardSkeletonProps) {
  return (
    <>
      {Array.from({ length }).map((_, i) => (
        <section key={i} className="card rounded-xl ">
          <div className="flex justify-between items-center mb-6 lg:mb-8">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-4 w-50" />
          <Skeleton className="h-4 w-50 mt-1" />

          <div className="my-4 lg:my-5 w-full">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-2 w-full mt-1" />
          </div>
          <Skeleton className="h-4 w-20" />
        </section>
      ))}
    </>
  );
}
