const DAY_MAP: Record<number, string> = {
  0: "SU",
  1: "MO",
  2: "TU",
  3: "WE",
  4: "TH",
  5: "FR",
  6: "SA",
};

export function getTodayEvents<T extends { days: string[] }>(events: T[]): T[] {
  const todayKey = DAY_MAP[new Date().getDay()];
  return events.filter((e) =>
    e.days.map((d) => d.toUpperCase()).includes(todayKey)
  );
}