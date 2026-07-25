const DAY_LABELS: Record<string, string> = {
  SU: "SUN",
  MO: "MON",
  TU: "TUE",
  WE: "WED",
  TH: "THU",
  FR: "FRI",
  SA: "SAT",
};

/**
 * Builds a human-readable schedule string from the source-of-truth columns
 * (day_of_week, start_time, end_time), instead of relying on the
 * `schedule` text column which may be missing on some rows.
 */
export function formatSchedule(offering: {
  day_of_week: string[] | null;
  start_time: string | null;
  end_time: string | null;
}): string {
  if (!offering.day_of_week?.length || !offering.start_time) {
    return "—";
  }

  const days = offering.day_of_week.map((d) => DAY_LABELS[d] ?? d).join("/");
  const time = formatTime(offering.start_time);

  return `${days} ${time}`;
}

function formatTime(time: string): string {
  const [hourStr, minuteStr] = time.split(":");
  const hour = Number(hourStr);
  const minute = minuteStr;
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minute} ${period}`;
}
