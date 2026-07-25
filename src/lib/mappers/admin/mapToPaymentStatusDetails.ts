import { format } from "date-fns";
import {
  PiCurrencyDollar,
  PiWallet,
  PiCreditCard,
  PiCalendarCheck,
} from "react-icons/pi";
import { StudentPaymentStatus } from "@/types";

export function mapToPaymentStatusDetails(data?: StudentPaymentStatus) {
  const totalDue = Number(data?.total_due ?? 0);
  const remaining = Number(data?.remaining ?? 0);

  return [
    {
      label: "Total Due",
      value: `$${totalDue.toLocaleString()}`,
      icon: PiCurrencyDollar,
    },
    {
      label: "Remaining",
      value: `$${remaining.toLocaleString()}`,
      icon: PiWallet,
    },
    ...(data?.last_payment
      ? [
          {
            label: "Last Payment",
            value: `$${data.last_payment.amount.toLocaleString()}`,
            icon: PiCreditCard,
          },
          {
            label: "Payment Date",
            value: format(
              new Date(data.last_payment.payment_date),
              "MMM dd, yyyy",
            ),
            icon: PiCalendarCheck,
          },
        ]
      : []),
  ];
}
