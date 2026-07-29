
export interface StudentPaymentStatus {
  has_data: boolean;
  semester?: string;
  academic_year?: string;
  total_due?: string;
  total_paid?: string;
  remaining?: string;
  last_payment?: {
    amount: number;
    payment_date: string;
    notes: string | null;
  } | null;
}

export type PaymentHistoryStatus = "paid" | "partial" | "pending";

export interface PaymentHistoryRecord {
  semester: string;
  academic_year: string;
  amount: number;
  payment_date: string | null;
  notes: string | null;
  status: PaymentHistoryStatus;
}

export interface PaymentHistorySummary {
  total_paid: number;
  semesters_paid: number;
}

export interface StudentPaymentHistoryStudent {
  full_name: string;
  student_code: string;
}

export interface StudentPaymentHistory {
  student: StudentPaymentHistoryStudent;
  summary: PaymentHistorySummary;
  records: PaymentHistoryRecord[];
}