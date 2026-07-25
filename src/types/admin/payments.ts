export interface Payment {
  id: string;
  amount: number;
  payment_date: string;
  notes: string | null;
  recorded_by: string;
  created_at: string;
}

export interface StudentFinancialSummary {
  total_due: number;
  total_paid: number;
  remaining: number;
  payments: Payment[];
}

export interface StudentSearchResult {
  id: string;
  student_code: string;
  full_name: string;
}

export interface RecordPaymentParams {
  studentId: string;
  amount: number;
  semester: string;
  academicYear: string;
  notes?: string;
}

export interface FinancialSummaryParams {
  studentId: string;
  semester: string;
  academicYear: string;
}
