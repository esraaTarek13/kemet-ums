"use client";
import { useStudentTranscript } from "@/hooks/admin/students/queries/useStudentTranscript";
import { downloadTranscript } from "@/lib/utils/admin/downloadStudentTranscript";
import { MdDownload } from "react-icons/md";
import { toast } from "sonner";

interface DownloadTranscriptButtonProps {
  studentId: string;
}

export default function DownloadTranscriptButton({
  studentId,
}: DownloadTranscriptButtonProps) {
  const { refetch, isFetching } = useStudentTranscript(studentId);

  async function handleClick() {
    try {
      const { data, error } = await refetch();
 
      if (error) throw error;
      if (!data) throw new Error("No transcript data returned");

      downloadTranscript(data);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to download transcript",
      );
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isFetching}
      aria-busy={isFetching}
      className="w-full lg:w-auto flex items-center justify-center gap-1.5 border border-bg-bar rounded-md py-2.5 px-5 btn-light text-accent text-sm md:text-base font-bold transition-all duration-200 cursor-pointer disabled:opacity-50"
    >
      <MdDownload aria-hidden="true" className="shrink-0 text-sm md:text-lg" />
      <span>{isFetching ? "Generating…" : "Download Transcript"}</span>
    </button>
  );
}
