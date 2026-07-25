import { format, parseISO } from "date-fns";

/**
 * Parses the date as UTC and formats it without converting to local time,
 * so a due date set as "Aug 5" always displays as "Aug 5" regardless of
 * the viewer's timezone.
 */
export function formatDueDate(dateString: string) {
    const date = parseISO(dateString);
    const utcDate = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
    );
    return format(utcDate, "MMM d, yyyy");
}