import AnnouncementsStats from "./AnnouncementsStats";
import AnnouncementsList from "./announcements-list/AnnouncementsList";
import CreateAnnouncementForm from "./create-announcement/CreateAnnouncementForm";
import CreateAnnouncementModal from "./create-announcement/CreateAnnouncementModal";

export default function AnnouncementsSection() {
  return (
    <>
      <section className="flex justify-between items-center">
        <h3 className="title">Announcements</h3>

        {/* Renders its own trigger button (mobile) + the modal */}
        <CreateAnnouncementModal />
      </section>

      <AnnouncementsStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:min-h-0">
        <AnnouncementsList />
        {/* Desktop-only inline form, replaces the modal above on lg+ */}
        <div className="hidden lg:block">
          <CreateAnnouncementForm />
        </div>
      </div>
    </>
  );
}
