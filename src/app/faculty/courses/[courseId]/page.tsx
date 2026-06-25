import CourseAssignmentsCard from "@/components/faculty/courses/course-details/assignments/CourseAssignmentsCard";
import CourseHeader from "@/components/faculty/courses/course-details/CourseHeader";
import CourseMaterialsCard from "@/components/faculty/courses/course-details/materials/CourseMaterialsCard";
import CourseProgressCard from "@/components/faculty/courses/course-details/progress/CourseProgressCard";

export default async function CourseDetailsPage({params} : {params: Promise<{ courseId: string }>}) {
  const { courseId } = await params;
  return (
    <div className="Custom-container flex flex-col gap-5 md:gap-6">
      <CourseHeader courseId={courseId} />
      <CourseProgressCard courseId={courseId} />
      <CourseMaterialsCard courseId={courseId} />
      <CourseAssignmentsCard courseId={courseId} />
    </div>
  )
}
