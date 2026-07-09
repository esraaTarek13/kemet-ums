import { AdminsStats } from "@/types";
import {
  PiUsersThree,
  PiCheckCircle,
  PiXCircle,
  PiQuestion,
} from "react-icons/pi";

export function mapToAdminsStats(data?: AdminsStats) {
  return [
    {
      label: "Total Admins",
      value: data?.total_admins ?? 0,
      icon: PiUsersThree,
    },
    {
      label: "Active",
      value: data?.active ?? 0,
      icon: PiCheckCircle,
    },
    {
      label: "Suspended",
      value: data?.suspended ?? 0,
      icon: PiXCircle,
    },
    {
      label: "Unspecified",
      value: data?.unspecified ?? 0,
      icon: PiQuestion,
    },
  ];
}