const DAY_MAP: Record<number, string> = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
};

export function getTodayEvents<T extends { days: string[] }>(events: T[]): T[] {
  const todayKey = DAY_MAP[new Date().getDay()];
  return events.filter((e) =>
    e.days.map((d) => d.toUpperCase()).includes(todayKey)
  );
}