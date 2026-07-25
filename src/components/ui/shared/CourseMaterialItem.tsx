import { FacultyMaterial, StudentCourseDetails } from "@/types";
import { downloadFile } from "@/lib/utils/shared/downloadFile";
import { getFileIcon } from "@/lib/utils/shared/getFileIcon";
import { FaRegTrashCan } from "react-icons/fa6";
import { PiDownloadSimpleBold } from "react-icons/pi";

interface CourseMaterialsListProps {
  material: FacultyMaterial | StudentCourseDetails["materials"][number] ;
  onDelete?: () => void;
}

export default function CourseMaterialItem({
  material,
  onDelete,
}: CourseMaterialsListProps) {
  const { Icon, color } = getFileIcon(material.file_type ?? "");

  return (
    <li
      key={material.id}
      className="flex items-center justify-between bg-bg-navbar rounded-sm p-2.5 md:p-4"
    >
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className="bg-bg-subtle border border-primary/10 rounded-sm p-1.5 md:p-3.5"
        >
          <Icon
            aria-hidden="true"
            className={`${color} text-xl md:text-4xl shrink-0`}
          />
        </div>
        <div>
          <h4 className="text-text-primary font-bold text-sm sm:text-base md:text-lg">
            {material.title}
          </h4>
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

      {onDelete ? (
        <button
          type="button"
          aria-label={`Delete ${material.title}`}
          onClick={onDelete}
          className="bg-danger-bg p-2 rounded-sm cursor-pointer"
        >
          <FaRegTrashCan
            aria-hidden="true"
            className="text-danger text-xl md:text-2xl shrink-0"
          />
        </button>
      ) : (
        <button
          type="button"
          aria-label={`Download ${material.title} — ${material.file_size} ${material.file_type}`}
          onClick={() => downloadFile(material.file_url, material.title)}
          className="cursor-pointer p-2 rounded-sm focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <PiDownloadSimpleBold
            aria-hidden="true"
            className="text-accent text-lg md:text-3xl"
          />
        </button>
      )}
    </li>
  );
}
