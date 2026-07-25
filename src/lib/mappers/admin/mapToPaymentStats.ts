import { FinancialReportsSummary } from "@/types";
import {
  PiCoins,
  PiUsersThree,
  PiClockCountdown,
  PiWarningCircle,
} from "react-icons/pi";

export function mapToPaymentStats(data?: FinancialReportsSummary) {
  return [
    {
      label: "Total Collected",
      value: data?.total_collected ?? 0,
      icon: PiCoins,
      description: "EGP",
    },
    {
      label: "Students With Dues",
      value: data?.students_with_dues ?? 0,
      icon: PiUsersThree,
    },
    {
      label: "Pending Payments",
      value: data?.pending_payments ?? 0,
      icon: PiClockCountdown,
      description: data?.pending_payments ? "Action required" : undefined,
      descriptionColor: "warning" as const,
    },
    {
      label: "Overdue Accounts",
      value: data?.overdue_accounts ?? 0,
      icon: PiWarningCircle,
      description: data?.overdue_accounts ? "Needs follow-up" : undefined,
      descriptionColor: "danger" as const,
    },
  ];
}
