import { Skeleton } from "@/components/ui/skeletons/Skeleton";

export default function ScheduleSkeleton() {
  const hours = [6, 7, 8, 9, 10, 11, 12, 13];
  const days = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];

  const fakeEvents = [
    { day: 1, hour: 3, span: 1 },
    { day: 3, hour: 3, span: 1 },
    { day: 5, hour: 3, span: 1 },
    { day: 1, hour: 4, span: 1.5 },
    { day: 3, hour: 5, span: 1 },
    { day: 6, hour: 4, span: 1 },
  ];

  return (
    <section className="card overflow-hidden p-0">
      {/* Header */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)] bg-bg-filter border-b border-bg-bar">
        <div />
        {days.map((day, i) => (
          <div key={day} className="flex flex-col items-center py-3 gap-1">
            <Skeleton className={`h-3 w-7 ${i === 2 ? "opacity-60" : ""}`} />
            <Skeleton className={`h-5 w-6 ${i === 2 ? "opacity-60" : ""}`} />
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="relative">
        {hours.map((hour) => (
          <div
            key={hour}
            className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-bg-bar h-18"
          >
            <div className="flex items-start pt-1 px-2">
              <Skeleton className="h-3 w-10" />
            </div>
            {days.map((day) => (
              <div key={day} className="border-l border-bg-bar" />
            ))}
          </div>
        ))}

        {/* Fake Events Overlay */}
        <div className="absolute inset-0 grid grid-cols-[60px_repeat(7,1fr)] pointer-events-none">
          <div />
          {days.map((_, colIndex) => (
            <div key={colIndex} className="relative">
              {fakeEvents
                .filter((e) => e.day === colIndex)
                .map((e, i) => (
                  <div
                    key={i}
                    className="absolute left-1 right-1 rounded-lg border-l-4 border-bg-bar bg-bg-bar animate-pulse"
                    style={{
                      top: `${e.hour * 72 + 4}px`,
                      height: `${e.span * 72 - 8}px`,
                    }}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
