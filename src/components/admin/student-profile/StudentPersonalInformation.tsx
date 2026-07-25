import { mapToStudentPersonalInfo } from "@/lib/mappers/admin/mapToStudentPersonalInfo";
import { StudentProfileHeader } from "@/types";

interface StudentPersonalInformationProps {
  informations: StudentProfileHeader;
}

export default function StudentPersonalInformation({
  informations,
}: StudentPersonalInformationProps) {
  const studentInfoItems = mapToStudentPersonalInfo(informations);

  return (
    <section className="card grow">
      <h4 className="title border-b border-border-card pb-4">
        Personal Information
      </h4>
      <div className="grid grid-cols-2 lg:grid-cols-3 justify-between gap-6 mt-4">
        {studentInfoItems.map((info) => (
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
