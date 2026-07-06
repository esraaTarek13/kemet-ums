import { FacultyStudentProfile } from "@/types";
import Image from "next/image";
import { FaRegEnvelope } from "react-icons/fa6";

interface StudentHeaderProps {
  student: FacultyStudentProfile | undefined;
}

export default function StudentHeader({ student }: StudentHeaderProps) {
  return (
    <section className="card flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden">
      {/* Decorative bg logo — hidden on mobile to avoid clutter */}
      <div
        aria-hidden="true"
        className="hidden sm:block absolute right-2 sm:-bottom-2.5 lg:-bottom-0.5 h-[80%] w-30 lg:w-40 bg-[url('/images/mark-logo.png')] bg-no-repeat bg-center bg-contain mix-blend-luminosity brightness-90"
      />

      <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center shrink-0 overflow-hidden">
        {student?.avatar_url ? (
          <Image
            src={student.avatar_url}
            alt={student.full_name}
            width={80}
            height={80}
            className="w-full h-auto object-cover"
          />
        ) : (
          <span className="text-2xl font-bold text-accent" aria-hidden="true">
            {student?.full_name.charAt(0)}
          </span>
        )}
      </div>

      <div className="text-center sm:text-start">
        <h2 className="title">{student?.full_name}</h2>
        <p className="flex items-center justify-center sm:justify-start gap-2 text-text-secondary text-sm md:text-base">
          <FaRegEnvelope className="text-sm shrink-0 mt-1" />
          <span>{student?.email}</span>
        </p>

        <div className="flex gap-3 items-center flex-wrap mt-1 text-text-subtle font-medium">
          <p className="text-xs md:text-sm">{student?.student_code}</p>

          <div
            aria-hidden="true"
            className="h-1.5 w-1.5 bg-text-subtle/50 rounded-full"
          />

          <p className="text-xs md:text-base">{student?.department}</p>

          <div
            aria-hidden="true"
            className="h-1.5 w-1.5 bg-text-subtle/50 rounded-full"
          />

          <p className="text-xs md:text-base">Year {student?.academic_year}</p>
        </div>
      </div>
    </section>
  );
}
