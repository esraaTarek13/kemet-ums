import { Skeleton } from "./Skeleton";

interface CourseCardSkeletonProps {
  length?: number;
}

export default function CourseCardSkeleton({
  length = 4,
}: CourseCardSkeletonProps) {
  return (
    <>
      {Array.from({ length }).map((_, i) => (
        <section key={i} className="card rounded-xl ">
          <Skeleton className="h-6 w-50" />
          <Skeleton className="h-6 w-50 mt-1" />

          <div className="my-4 lg:my-5 w-full">
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-6 w-full mt-1" />
          </div>
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20 mt-2" />
        </section>
      ))}
    </>
  );
}
