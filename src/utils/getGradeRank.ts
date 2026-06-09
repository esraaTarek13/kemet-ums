export function getGradeRank(grade: number | null, maxGrade: number | null): string {
  if (!grade || !maxGrade) return "";
  const percentage = (grade / maxGrade) * 100;
  if (percentage >= 90) return "Excellent";
  if (percentage >= 80) return "Very Good";
  if (percentage >= 70) return "Good";
  if (percentage >= 60) return "Pass";
  return "Below Average";
}