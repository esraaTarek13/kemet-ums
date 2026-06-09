import { TbFileUpload } from "react-icons/tb";

export default function FileSubmission() {
  return (
    <div className="space-y-2 my-8">
      <p className="text-text-secondary text-xs uppercase">file submission</p>
      <div className="flex flex-col justify-center items-center gap-4 py-6 md:py-8 lg:py-10 border border-dashed border-[#C4A8824D]">
        <span className="bg-accent/10 py-3 px-3.5 rounded-xl">
          <TbFileUpload className="text-accent text-3xl md:text-5xl shrink-0" />
        </span>
        <div>
          <p className="text-sm md:text-base lg:text-lg text-primary font-semibold text-center">Drag & drop your file here</p>
          <p className="text-xs md:text-sm text-text-muted text-center">Accepted formats: PDF, DOC, DOCX</p>
        </div>
      </div>
    </div>
  );
}
