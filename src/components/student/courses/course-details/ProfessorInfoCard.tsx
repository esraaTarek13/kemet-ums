"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import InstructorCardSkeleton from "@/components/ui/skeletons/InstructorCardSkeleton";
import { useStudentCourseDetails } from "@/hooks/student/useStudentCourseDetails";
import Image from "next/image";
import { FaRegEnvelope, FaUserCircle } from "react-icons/fa";
import { PiDoorBold } from "react-icons/pi";

export default function ProfessorInfoCard({ courseId }: { courseId: string }) {
  const { data, isError, isPending } = useStudentCourseDetails(courseId);
  const faculty = data?.faculty;

  if (isPending) return <InstructorCardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load course." />;

  return (
    <section
      aria-label="Professor information"
      className="card-top-border flex flex-col items-center gap-4 px-8"
    >
      {/* professor avatar — sr-only fallback if no image */}
      {faculty?.avatar_url ? (
        <Image
          src={faculty.avatar_url}
          alt={faculty.full_name}
          width={68}
          height={68}
          className="rounded-full object-cover w-16 h-16"
        />
      ) : (
        <>
          <FaUserCircle aria-hidden="true" className="text-primary text-6xl" />
          <span className="sr-only">
            {faculty?.full_name ?? "Professor"} — no photo available
          </span>
        </>
      )}

      <div className="space-y-1">
        <h4 className="font-bold text-accent text-lg md:text-xl lg:text-2xl text-center">
          {faculty?.full_name}
        </h4>
        <p className="font-bold text-text-secondary text-xs md:text-sm text-center uppercase">
          {faculty?.rank} of {faculty?.specialization}
        </p>
      </div>

      {/* contact and office info */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-text-muted text-center">
          <FaRegEnvelope aria-hidden="true" />
          <p className="text-xs md:text-sm">{faculty?.email}</p>
        </div>
        <div className="flex items-center gap-2 text-text-muted text-center">
          <PiDoorBold aria-hidden="true" />
          <p className="text-xs md:text-sm">
            Office Hours: {faculty?.office_location}
          </p>
        </div>
      </div>
    </section>
  );
}
