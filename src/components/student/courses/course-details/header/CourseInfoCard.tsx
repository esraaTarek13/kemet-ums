interface CourseInfoCardProps {
  courseCode: string;
  courseName: string;
  semester: string;
  room: string | null;
  schedule: string | null;
}

export default function CourseInfoCard({
  courseCode,
  courseName,
  semester,
  room,
  schedule,
}: CourseInfoCardProps) {
  return (
    <div className="card flex flex-col sm:flex-row items-center gap-4 md:gap-5 lg:gap-6">
      <div
        aria-hidden="true"
        className="bg-bg-subtle border border-primary/10 rounded-lg py-4 md:py-6 px-2 w-fit h-fit"
      >
        <p className="font-bold text-accent text-base md:text-lg lg:text-xl">
          {courseCode}
        </p>
      </div>

      <div className="space-y-2 sm:space-y-1">
        <h3 className="header-title text-center sm:text-start">{courseName}</h3>

        <div
          aria-label={`Room ${room}, ${schedule}, Semester ${semester}`}
          className="flex items-center justify-center sm:justify-start gap-1 md:gap-3 flex-wrap"
        >
          <span
            aria-hidden="true"
            className="header-subtitle text-text-secondary/80"
          >
            {semester}
          </span>
          <div
            aria-hidden="true"
            className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full"
          />
          <span
            aria-hidden="true"
            className="header-subtitle text-text-secondary/80"
          >
            {room}
          </span>
          <div
            aria-hidden="true"
            className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full"
          />
          <span
            aria-hidden="true"
            className="header-subtitle text-text-secondary/80"
          >
            {schedule}
          </span>
        </div>
      </div>
    </div>
  );
}
