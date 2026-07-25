"use client"
import ScheduleSkeleton from "@/components/ui/skeletons/ScheduleSkeleton";
import dynamic from "next/dynamic";

const Schedule = dynamic(() => import("./Schedule"), {
  loading: () => <ScheduleSkeleton />,
  ssr: false,
});

export default Schedule;
