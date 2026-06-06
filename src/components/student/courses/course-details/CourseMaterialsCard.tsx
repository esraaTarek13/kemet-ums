"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import CourseCardSkeleton from "@/components/ui/skeletons/CourseCardSkeleton";
import { useStudentCourseDetails } from "@/hooks/student/useStudentCourseDetails";
import { downloadFile } from "@/utils/downloadFile";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { PiDownloadSimpleBold } from "react-icons/pi";

export default function CourseMaterialsCard({
  courseId,
}: {
  courseId: string;
}) {
  const { data, isPending, isError } = useStudentCourseDetails(courseId);
  const materials = data?.materials;

  if (isPending) return <CourseCardSkeleton length={1} />;
  if (isError)
    return <ErrorMessage content="Failed to load Course Materials." />;

  return (
    <section
      aria-label="Course materials"
      className="card-top-border space-y-5 md:space-y-6"
    >
      <h3 className="title">Course Materials</h3>

      {/* empty state */}
      {!materials?.length ? (
        <p role="status" className="text-text-subtle text-sm text-center py-10">
          No materials available.
        </p>
      ) : (
        <ul className="space-y-3">
          {materials.map((material) => (
            <li
              key={material.id}
              className="flex items-center justify-between bg-bg-navbar rounded-sm p-2.5 md:p-4"
            >
              <div className="flex items-center gap-4">
                <div
                  aria-hidden="true"
                  className="bg-bg-subtle border border-primary/10 rounded-sm p-1.5 md:p-3.5"
                >
                  <MdOutlinePictureAsPdf className="text-[#DC2626] text-xl md:text-5xl shrink-0" />
                </div>
                <div>
                  <h4 className="text-text-primary font-bold text-sm sm:text-base md:text-lg">
                    {material.title}
                  </h4>
                  {/* file meta — decorative, covered by download button aria-label */}
                  <div
                    aria-hidden="true"
                    className="flex gap-1 items-center text-text-subtle mt-1"
                  >
                    <span className="text-xs md:text-sm uppercase">
                      {material.file_size}
                    </span>
                    <div className="h-1.5 w-1.5 bg-text-subtle rounded-full" />
                    <span className="text-xs md:text-sm uppercase">
                      {material.file_type}
                    </span>
                  </div>
                </div>
              </div>

              {/* download — aria-label covers title, size, type */}
              <button
                type="button"
                aria-label={`Download ${material.title} — ${material.file_size} ${material.file_type}`}
                onClick={() => downloadFile(material.file_url, material.title)}
                className="cursor-pointer"
              >
                <PiDownloadSimpleBold
                  aria-hidden="true"
                  className="text-accent text-lg md:text-3xl"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
