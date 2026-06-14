import CourseHeader from "@/components/student/courses/course-details/CourseHeader";
import CourseMaterialsCard from "@/components/student/courses/course-details/CourseMaterialsCard";
import MyPerformanceCard from "@/components/student/courses/course-details/MyPerformanceCard";
import ProfessorInfoCard from "@/components/student/courses/course-details/ProfessorInfoCard";
import WeeklyScheduleCard from "@/components/student/courses/course-details/WeeklyScheduleCard";

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return (
    <div className="Custom-container flex flex-col gap-5 md:gap-6">
      <CourseHeader courseId={courseId} />
      <section className="flex flex-col lg:flex-row gap-5 md:gap-6">
        <div className="space-y-5 md:space-y-6 grow">
          <MyPerformanceCard courseId={courseId} />
          <CourseMaterialsCard courseId={courseId} />
        </div>
        <div className="space-y-5 md:space-y-6">
          <ProfessorInfoCard courseId={courseId} />
          <WeeklyScheduleCard courseId={courseId} />
        </div>
      </section>
    </div>
  );
}
