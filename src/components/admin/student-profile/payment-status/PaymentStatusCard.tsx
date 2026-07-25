import PaymentHistoryModal from "./PaymentHistoryModal";
import ProgressBar from "@/components/ui/shared/ProgressBar";
import StatusBadge from "@/components/ui/shared/StatusBadge";
import { usePaymentStatusCard } from "@/hooks/admin/students/usePaymentStatusCard";

interface PaymentStatusProps {
  studentId: string;
}

export default function PaymentStatusCard({ studentId }: PaymentStatusProps) {
  const {
    semester,
    totalDue,
    totalPaid,
    progressValue,
    paymentStatus,
    isFullyPaid,
    paymentDetails,
  } = usePaymentStatusCard({ studentId });

  return (
    <section className="card w-full lg:w-85">
      <div className="flex justify-between items-center gap-2 flex-wrap pb-5 border-b border-border">
        <h4 className="title">Payment Status</h4>
        <StatusBadge status={paymentStatus} />
      </div>

      <div className="py-4 border-b border-border">
        <p className="text-xs md:text-sm text-text-subtle">{semester}</p>
        <ProgressBar
          value={progressValue}
          progressClass={isFullyPaid ? "bg-success" : "bg-pending"}
          textClass={isFullyPaid ? "text-success" : "text-pending"}
        />

        <div className="flex justify-between items-center text-xs text-text-subtle pt-1">
          <span>${totalPaid.toLocaleString()} paid</span>
          <span>${totalDue.toLocaleString()} total</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 py-4 border-b border-border mb-4">
        {paymentDetails.map(({ label, value, icon: Icon }) => (
          <div key={label} className="space-y-1">
            <p className="flex items-center gap-1 text-[10px] md:text-xs uppercase text-text-secondary/70">
              <Icon className="size-2.5 md:size-3.5" />
              {label}
            </p>
            <p className="font-medium text-xs md:text-sm text-text-primary">
              {value}
            </p>
          </div>
        ))}
      </div>

      <PaymentHistoryModal studentId={studentId} />
    </section>
  );
}
