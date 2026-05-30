import { saveAs } from "file-saver";

export const downloadFile = (fileUrl: string, title: string) => {
  saveAs(fileUrl, title);
};