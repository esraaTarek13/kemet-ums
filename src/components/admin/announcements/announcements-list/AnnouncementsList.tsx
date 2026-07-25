"use client";
import { AdminAnnouncement } from "@/types";
import AnnouncementsFilter from "./AnnouncementsFilter";
import AnnouncementItem from "./AnnouncementItem";
import { useState } from "react";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton";
import { useDeleteAnnouncementAction } from "@/hooks/admin/announcements/useDeleteAnnouncementAction";
import ConfirmDialog from "@/components/ui/shared/ConfirmDialog";
import EditAnnouncementModal from "../edit-announcement/EditAnnouncementModal";
import { useAnnouncementsList } from "@/hooks/admin/announcements/useAnnouncementsList";
import { useRadixPointerEventsFix } from "@/hooks/shared/useRadixPointerEventsFix";

export default function AnnouncementsList() {
  // Workaround for Radix leaving pointer-events: none on <body>
  // after a dialog/modal closes
  useRadixPointerEventsFix();

  const { filterState, setFilterState, announcements, isPending, isError } =
    useAnnouncementsList();

  const {
    deletingAnnouncement,
    isDeleting,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  } = useDeleteAnnouncementAction();

  const [editingAnnouncement, setEditingAnnouncement] =
    useState<AdminAnnouncement | null>(null);

  return (
    <section
      aria-label="Announcements"
      className="flex flex-col gap-8 lg:h-screen min-h-0"
    >
      <AnnouncementsFilter value={filterState} onChange={setFilterState} />

      {/* Fixed-height scroll area on desktop, natural flow on mobile */}
      <div
        aria-live="polite"
        aria-busy={isPending}
        className="flex-1 min-h-0 lg:overflow-y-hidden"
      >
        {isError ? (
          <ErrorMessage content="Failed to load Announcements." />
        ) : isPending ? (
          <CardSkeleton />
        ) : announcements?.length === 0 ? (
          <p role="status" className="text-text-muted text-sm mt-6 text-center">
            No announcements found.
          </p>
        ) : (
          <ul
            aria-label="Announcements list"
            className="space-y-5 md:space-y-6 pr-4 h-full overflow-y-auto"
          >
            {announcements?.map((a) => (
              <AnnouncementItem
                key={a.id}
                announcement={a}
                onEdit={() => setEditingAnnouncement(a)}
                onDelete={() => openDeleteDialog(a)}
              />
            ))}
          </ul>
        )}
      </div>

      <EditAnnouncementModal
        announcement={editingAnnouncement}
        onOpenChange={(open) => !open && setEditingAnnouncement(null)}
      />

      <ConfirmDialog
        open={!!deletingAnnouncement}
        onOpenChange={(open) => !open && closeDeleteDialog()}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        title="Delete announcement?"
        description={`Are you sure you want to delete "${deletingAnnouncement?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
      />
    </section>
  );  
}
