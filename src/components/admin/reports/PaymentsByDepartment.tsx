"use client";
import ProgressBar from "@/components/ui/shared/ProgressBar";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import PaymentsByDepartmentSkeleton from "@/components/ui/skeletons/PaymentsByDepartmentSkeleton";
import { formatEGP } from "@/lib/utils/shared/currency";
import { usePaymentsByDepartment } from "@/hooks/admin/report/queries/usePaymentsByDepartment";

interface PaymentsByDepartmentProps {
  semester: string;
  academicYear: string;
}

export default function PaymentsByDepartment({
  semester,
  academicYear,
}: PaymentsByDepartmentProps) {
  const { data, isPending, isError } = usePaymentsByDepartment({
    semester,
    academicYear,
  });

  if (isPending) return <PaymentsByDepartmentSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load department payments." />;

  const departments = data ?? [];
  const maxCollected = Math.max(...departments.map((d) => d.total_collected), 1);

  return (
    <div className="card space-y-5">
      <h4 className="title">Payments by Department</h4>

      {departments.length === 0 && (
        <p className="text-text-secondary text-xs md:text-sm">No payments recorded yet.</p>
      )}

      <div className="space-y-4">
        {departments.map((dept) => (
          <div key={dept.department} className="space-y-1">
            <div className="flex justify-between text-xs md:text-sm">
              <span className="text-text-primary font-medium">
                {dept.department}
              </span>
              <span className="text-accent font-bold">
                {formatEGP(dept.total_collected)}
              </span>
            </div>
            <ProgressBar
              value={Math.round((dept.total_collected / maxCollected) * 100)}
              progressClass="bg-accent"
              textClass="hidden"
            />
          </div>
        ))}
      </div>
    </div>
  );
}