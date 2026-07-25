import { mapToFacultyPersonalInfo } from "@/lib/mappers/admin/mapToFacultyPersonalInfo";
import { FacultyProfileHeader } from "@/types";

interface FacultyPersonalInformationProps {
  header: FacultyProfileHeader;
}

export default function FacultyPersonalInformation({
  header,
}: FacultyPersonalInformationProps) {
  const personalInfoItems = mapToFacultyPersonalInfo(header);

  return (
    <section className="card grow">
      <h4 className="title border-b border-border-card pb-4">
        Personal Information
      </h4>
      <div className="grid grid-cols-2 justify-between gap-6 mt-4">
        {personalInfoItems.map((info) => (
          <div key={info.id} className="space-y-1">
            <h5 className="text-text-secondary text-[10px] md:text-xs uppercase">
              {info.label}
            </h5>
            <p className="text-text-primary text-xs md:text-sm font-semibold">
              {info.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
