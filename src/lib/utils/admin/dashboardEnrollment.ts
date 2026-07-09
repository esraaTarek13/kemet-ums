export function getDateRange(data: { month: string }[] | undefined): string {
  if (!data?.length) return "No Data";

  const first = data[0].month;
  const last = data[data.length - 1].month;

  return first === last ? first : `${first} – ${last}`;
}
