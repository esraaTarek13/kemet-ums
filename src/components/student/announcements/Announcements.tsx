"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton";
import { useAnnouncements } from "@/hooks/shared/useAnnouncements";
import { Announcement } from "@/types";
import { useState } from "react";
import AnnouncementItem from "./AnnouncementItem";
import { PRIORITIES } from "@/data/student/announcements";

export default function Announcements() {
  const { data: announcements, isPending, isError } = useAnnouncements();

  const [selectedPriority, setSelectedPriority] = useState<
    Announcement["priority"] | "all"
  >("all");

  const filteredAnnouncements = announcements?.filter((a) =>
    selectedPriority === "all" ? true : a.priority === selectedPriority,
  );

  if (isPending) return <CardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load announcements" />;
  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <h3 className="title">Announcements</h3>

        {/* Priority filter tabs */}
        <div
          role="group"
          aria-label="Filter announcement by priority"
          className="w-fit bg-bg-filter p-1 rounded-xl"
        >
          {PRIORITIES.map((priority) => (
            <button
              key={priority}
              type="button"
              aria-pressed={selectedPriority === priority}
              onClick={() => setSelectedPriority(priority)}
              className={`text-[10px] sm:text-xs lg:text-sm tracking-wider uppercase py-2 px-4 md:px-6 rounded-xl cursor-pointer ${
                selectedPriority === priority
                  ? "bg-accent text-text-white"
                  : "text-text-muted"
              }`}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {filteredAnnouncements?.length === 0 ? (
        <p className="text-text-muted text-sm mt-6 text-center">
          No {selectedPriority !== "all" ? selectedPriority : ""} announcements
          found.
        </p>
      ) : (
        <ul className="space-y-5 md:space-y-6">
          {filteredAnnouncements?.map((a) => (
            <AnnouncementItem key={a.id} announcement={a} />
          ))}
        </ul>
      )}
    </section>
  );
}
