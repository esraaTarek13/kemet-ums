import StatusBadge, { BadgeStatus } from "@/components/ui/shared/StatusBadge";
import { StudentProfileHeader as StudentProfileHeaderData } from "@/types";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import DeleteStudentButton from "./DeleteStudentButton";
import UpdateStudentProfileModal from "./update-student-profile/UpdateStudentProfileModal";
import DownloadTranscriptButton from "./DownloadTranscriptButton";

interface StudentProfileHeaderProps {
  header: StudentProfileHeaderData;
  hasActiveCourses: boolean;
}

export default function StudentProfileHeader({
  header,
  hasActiveCourses,
}: StudentProfileHeaderProps) {
  return (
    <section
      aria-label={`${header.full_name} Student Profile header`}
      className="card flex flex-col lg:flex-row justify-between gap-4 lg:items-center"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-5 lg:gap-6">
        {header.avatar_url ? (
          <Image
            src={header.avatar_url}
            alt={`${header.full_name}'s profile picture`}
            width={100}
            height={100}
            priority
            className="rounded-full object-cover w-18 md:w-22 h-18 md:h-22"
          />
        ) : (
          <span role="img" aria-label={`${header.full_name}'s profile picture`}>
            <FaUserCircle
              aria-hidden="true"
              className="text-primary text-7xl md:text-8xl shrink-0"
            />
          </span>
        )}

        <div className="space-y-2 sm:space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 lg:gap-3 flex-wrap">
            <h3 className="header-title">{header.full_name}</h3>
            {header.status && (
              <StatusBadge status={header.status as BadgeStatus} />
            )}
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-1 md:gap-3 flex-wrap">
            <span className="header-subtitle text-text-secondary/80">
              {header.student_code}
            </span>

            <div
              aria-hidden="true"
              className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full"
            />

            <span className="header-subtitle text-text-secondary/80">
              {header.department}
            </span>

            <div
              aria-hidden="true"
              className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full"
            />

            <span className="header-subtitle text-text-secondary/80">
              {header.academic_year} year
            </span>
          </div>
        </div>
      </div>

      <div className="h-fit flex flex-col-reverse xl:flex-row gap-2 w-full lg:w-fit">
        <DownloadTranscriptButton studentId={header.student_id} />
        <div className="h-fit flex flex-row gap-2 w-full xl:w-fit">
          <UpdateStudentProfileModal studentId={header.student_id} />
          <DeleteStudentButton
            studentId={header.student_id}
            hasActiveCourses={hasActiveCourses}
          />
        </div>
      </div>
    </section>
  );
}
