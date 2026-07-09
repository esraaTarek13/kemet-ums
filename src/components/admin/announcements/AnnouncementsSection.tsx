"use client";

import AnnouncementsStats from "./AnnouncementsStats";
import AnnouncementsList from "./announcements-list/AnnouncementsList";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import CreateAnnouncement from "./manage-announcement/CreateAnnouncement";
import CreateAnnouncementModal from "./manage-announcement/CreateAnnouncementModal";

export default function AnnouncementsSection() {
  // Controls visibility of the mobile "create announcement" modal
  const [isCreateAnnouncementOpen, setIsCreateAnnouncementOpen] =
    useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="title">Announcements</h1>

        {/* Mobile-only trigger (desktop uses the inline CreateAnnouncement form below) */}
        <button
          type="button"
          onClick={() => setIsCreateAnnouncementOpen(true)}
          className="btn btn-dark flex items-center justify-center gap-2 py-2 lg:hidden"
          // On screens < sm the label text is visually hidden, so we
          // provide an accessible name explicitly instead of relying on it
          aria-label="Create Announcement"
        >
          <FiPlus className="text-sm md:text-xl shrink-0" aria-hidden="true" />
          <span className="text-sm md:text-base hidden sm:block">
            Create Announcement
          </span>
        </button>
      </div>

      <AnnouncementsStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <AnnouncementsList />
        {/* Desktop-only inline form, replaces the modal above on lg+ */}
        <div className="hidden lg:block">
          <CreateAnnouncement />
        </div>
      </div>

      <CreateAnnouncementModal
        open={isCreateAnnouncementOpen}
        onOpenChange={setIsCreateAnnouncementOpen}
      />
    </>
  );
}
