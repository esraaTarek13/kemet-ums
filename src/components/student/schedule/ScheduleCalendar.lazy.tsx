"use client";
import ScheduleSkeleton from "@/components/ui/skeletons/ScheduleSkeleton";
import dynamic from "next/dynamic";

const ScheduleCalendar = dynamic(() => import("./ScheduleCalendar"), {
  loading: () => <ScheduleSkeleton />,
  ssr: false,
});

export default ScheduleCalendar;