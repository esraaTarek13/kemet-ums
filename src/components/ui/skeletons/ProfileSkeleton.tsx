import { Skeleton } from "./Skeleton";

export default function ProfileSkeleton() {
  return (
    <section className="space-y-6">
      <div className="card w-full flex flex-col sm:flex-row items-center gap-6 md:gap-8">
        <Skeleton className="rounded-full w-20 h-20" />
        <div className="space-y-6 grow">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-30" />
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-5 md:gap-6 lg:gap-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="card space-y-6 w-full">
            <Skeleton className="h-6 w-full" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
