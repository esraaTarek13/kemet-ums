import { format } from "date-fns";

/** Format timestamp safely, falling back to empty string on invalid dates */
export function formatTime(date: string) {
    const parsed = new Date(date);
    return isNaN(parsed.getTime()) ? "" : format(parsed, "hh:mm a");
}