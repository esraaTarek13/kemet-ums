import { Skeleton } from "@/components/ui/skeletons/Skeleton";

export default function CardSkeleton() {
  return (
    <section className="w-full space-y-4 lg:space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <section key={i} className="w-full card">
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