import { Announcement } from "@/types";

export const PRIORITIES: Array<Announcement["priority"] | "all"> = [
  "all",
  "normal",
  "important",
  "urgent",
];

