"use client";
import { useRecentAnnouncements } from "@/hooks/admin/useDashboard";
import CardSkeleton from "../skeletons/CardSkeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function Announcements() {
  const { data: res, isPending, isError } = useRecentAnnouncements();

  if (isPending) return <CardSkeleton length={3} />;
  if (isError) return <ErrorMessage content="Failed to load Announcements." />;

  return (
    <section className="card space-y-4 lg:space-y-6">
      <h3 className="title">Announcements</h3>
      <div className="space-y-4">
        {!res || res.length === 0 ? (
          <p className="text-text-muted text-center py-10 text-sm">
            No announcements yet.
          </p>
        ) : (
          res.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-bg-navbar border-l-4 border-text-secondary rounded-lg py-4 px-4 md:p-5"
            >
              <p className="mb-2 md:mb-3 text-text-subtle text-xs uppercase">
                {new Date(announcement.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h4 className="font-bold text-text-primary text-sm md:text-lg mb-1 line-clamp-1">
                {announcement.title}
              </h4>
              <p className="text-text-subtle text-xs md:text-sm line-clamp-2 lg:w-60 lg:truncate">
                {announcement.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
