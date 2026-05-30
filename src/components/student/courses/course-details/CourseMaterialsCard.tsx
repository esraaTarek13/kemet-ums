"use client";
import { useStudentCourseDetails } from "@/hooks/student/useStudentCourseDetails";
import { downloadFile } from "@/utils/downloadFile";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { PiDownloadSimpleBold } from "react-icons/pi";

export default function CourseMaterialsCard({
  courseId,
}: {
  courseId: string;
}) {
  const { data } = useStudentCourseDetails(courseId);
  const materials = data?.materials;

  return (
    <section className="card-top-border space-y-5 md:space-y-6">
      <h3 className="header-title">Course Materials</h3>

      {!materials?.length ? (
        <p className="text-text-subtle text-sm text-center py-10">
          No materials available.
        </p>
      ) : (
        materials.map((material) => (
          <div
            key={material.id}
            className="flex items-center justify-between bg-bg-navbar rounded-sm p-2.5 md:p-4"
          >
            <div className="flex items-center gap-4">
              <div className="bg-bg-subtle border border-primary/10 rounded-sm p-1.5 md:p-3.5">
                <MdOutlinePictureAsPdf className="text-[#DC2626] text-xl md:text-5xl shrink-0" />
              </div>
              <div>
                <h4 className="text-text-primary font-bold text-sm sm:text-base md:text-lg">
                  {material.title}
                </h4>
                <div className="flex gap-1 items-center text-text-subtle mt-1">
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
            <button
              type="button"
              aria-label={`Download ${material.title}`}
              onClick={() => downloadFile(material.file_url, material.title)}
              className="cursor-pointer"
            >
              <PiDownloadSimpleBold className="text-accent text-lg md:text-3xl" />
            </button>
          </div>
        ))
      )}
    </section>
  );
}
