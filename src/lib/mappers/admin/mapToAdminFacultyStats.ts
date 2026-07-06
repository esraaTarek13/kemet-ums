import { AdminFacultyStats } from "@/types";
import {
  PiUsers,
  PiClockCounterClockwise,
  PiClock,
  PiBuildings,
} from "react-icons/pi";

export function mapToAdminFacultyStats(data?: AdminFacultyStats) {
  return [
    {
      label: "Total Faculty",
      value: data?.total_faculty ?? 0,
      icon: PiUsers,
    },
    {
      label: "Full Time",
      value: data?.full_time ?? 0,
      icon: PiClock,
    },
    {
      label: "Part Time",
      value: data?.part_time ?? 0,
      icon: PiClockCounterClockwise,
    },
    {
      label: "Departments",
      value: data?.departments ?? 0,
      icon: PiBuildings,
    },
  ];
}
