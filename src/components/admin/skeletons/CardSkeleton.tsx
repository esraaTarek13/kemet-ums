import { Skeleton } from "@/components/ui/skeletons/Skeleton";

interface CardSkeletonProps {
  length?: number;
}
export default function CardSkeleton({ length = 1 }: CardSkeletonProps) {
  return (
    <section className="w-full lg:w-90 space-y-4 lg:space-y-6">
      {Array.from({ length }).map((_, i) => (
        <section
          key={i}
          className="w-full rounded-xl card border-l-4 border-accent/20"
        >
          <div className="w-full space-y-3">
            <Skeleton className="w-30 h-4" />
            <Skeleton className="w-full h-4" />
          </div>
          <Skeleton className="w-full h-4 mt-5" />
        </section>
      ))}
    </section>
  );
}
