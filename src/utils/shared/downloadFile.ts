import { saveAs } from "file-saver";

// Triggers a file download from a URL with a given filename
export const downloadFile = (fileUrl: string, title: string) => {
  saveAs(fileUrl, title);
};
