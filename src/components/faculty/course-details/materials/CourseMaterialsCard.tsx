"use client";
import CourseMaterialItem from "@/components/ui/shared/CourseMaterialItem";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import CourseCardSkeleton from "@/components/ui/skeletons/CourseCardSkeleton";
import { useState } from "react";
import AddMaterialsModal from "./AddMaterialsModal";
import { useFacultyCourseDetail } from "@/hooks/faculty/courses/queries/useFacultyCourseDetail";
import { useDeleteMaterial } from "@/hooks/faculty/courses/queries/useDeleteMaterial";

interface CourseMaterialsCardProps {
  courseId: string;
}

export default function CourseMaterialsCard({
  courseId,
}: CourseMaterialsCardProps) {
  const { data, isPending, isError } = useFacultyCourseDetail(courseId);
  const { mutate: deleteMaterial } = useDeleteMaterial();
  const [addMaterialsOpen, setAddMaterialsOpen] = useState(false);

  if (isPending) return <CourseCardSkeleton length={1} />;
  if (isError) return <ErrorMessage content="Failed to load materials." />;
  const courseMaterials = data?.materials ?? [];

  return (
    <section
      aria-label="Course materials"
      className="card-top-border space-y-5 md:space-y-6 px-0"
    >
      <div className="flex justify-between items-center gap-2 flex-wrap border-b border-border pb-4 px-4">
        <h3 className="title">Course Materials</h3>
        <button
          type="button"
          aria-label="Add new material"
          onClick={() => setAddMaterialsOpen(true)}
          className="btn btn-dark py-2"
        >
          Add Material
        </button>
      </div>

      {courseMaterials.length > 0 ? (
        <ul className="px-4 space-y-5 md:space-y-6">
          {courseMaterials?.map((material) => (
            <CourseMaterialItem
              key={material.id}
              material={material}
              onDelete={() => deleteMaterial(material.id)}
            />
          ))}
        </ul>
      ) : (
        <p
          role="status"
          className="text-text-muted col-span-full text-center py-10"
        >
          No materials yet.
        </p>
      )}

      <AddMaterialsModal
        offeringId={courseId}
        isOpen={addMaterialsOpen}
        onClose={() => setAddMaterialsOpen(false)}
      />
    </section>
  );
}
