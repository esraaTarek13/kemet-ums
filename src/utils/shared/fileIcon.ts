import {
  MdOutlinePictureAsPdf,
  MdOutlineDescription,
  MdOutlineSlideshow,
  MdOutlineInsertDriveFile,
} from "react-icons/md";

// Map file type to an appropriate icon + color
export function getFileIcon(fileType: string) {
  const type = fileType.toLowerCase();
  if (type === "pdf")
    return { Icon: MdOutlinePictureAsPdf, color: "text-[#DC2626]" };
  if (["doc", "docx"].includes(type))
    return { Icon: MdOutlineDescription, color: "text-[#2563EB]" };
  if (["ppt", "pptx"].includes(type))
    return { Icon: MdOutlineSlideshow, color: "text-[#EA580C]" };
  return { Icon: MdOutlineInsertDriveFile, color: "text-text-subtle" };
}