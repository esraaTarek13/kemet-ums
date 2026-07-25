/**
 * Derives the academic year ("2025-2026") from a semester string like "Fall 2025" or "Spring 2026".
 */
export function extractAcademicYear(semester: string): string {
  const yearMatch = semester.match(/\d{4}/);
  if (!yearMatch) return "";

  const year = Number(yearMatch[0]);
  const isFall = semester.startsWith("Fall");

  return isFall ? `${year}-${year + 1}` : `${year - 1}-${year}`;
}

/**
 * Combines a term (Fall/Spring/Summer) with an academic year ("2025-2026")
 * into the stored semester value ("Fall 2025" / "Spring 2026").
 * Used when CREATING a new offering, where the term and year are selected separately.
 */
export function buildSemesterValue(term: string, academicYear: string): string {
  const [startYear, endYear] = academicYear.split("-");
  if (term === "Fall") return `${term} ${startYear}`;
  return `${term} ${endYear}`;
}
