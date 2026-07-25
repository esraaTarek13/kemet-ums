import { useState } from "react";
import { AdminAnnouncement } from "@/types";
import { useDeleteAnnouncement } from "./queries/useDeleteAnnouncement";

export function useDeleteAnnouncementAction() {
  const [deletingAnnouncement, setDeletingAnnouncement] =
    useState<AdminAnnouncement | null>(null);

  const { mutate: deleteAnnouncement, isPending: isDeleting } =
    useDeleteAnnouncement();

  function openDeleteDialog(announcement: AdminAnnouncement) {
    setDeletingAnnouncement(announcement);
  }

  function closeDeleteDialog() {
    setDeletingAnnouncement(null);
  }

  function confirmDelete() {
    if (!deletingAnnouncement) return;
    deleteAnnouncement(deletingAnnouncement.id, {
      onSuccess: closeDeleteDialog,
    });
  }

  return {
    deletingAnnouncement,
    isDeleting,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  };
}