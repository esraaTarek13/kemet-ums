import { AdminAnnouncementsStats } from "@/types";
import {
  PiListChecks,
  PiCheckCircle,
  PiClock,
  PiCalendarBlank,
} from "react-icons/pi";

export function mapToAdminAnnouncementsStats(data?: AdminAnnouncementsStats) {
  return [
    {
      label: "Total",
      value: data?.total ?? 0,
      icon: PiListChecks,
    },
    {
      label: "Active",
      value: data?.active ?? 0,
      icon: PiCheckCircle,
    },
    {
      label: "Scheduled",
      value: data?.scheduled ?? 0,
      icon: PiCalendarBlank,
    },
    {
      label: "Expired",
      value: data?.expired ?? 0,
      icon: PiClock,
    },
  ];
}