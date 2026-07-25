"use client";

import { StudentSearchResult } from "@/types";
import { useState } from "react";
import StudentSearch from "./StudentSearch";
import PaymentForm from "./PaymentForm";
import SemesterYearSelect from "./SemesterYearSelect";

export default function PaymentsSection() {
  const [selectedStudent, setSelectedStudent] =
    useState<StudentSearchResult | null>(null);
  const [semester, setSemester] = useState("");
  const [academicYear, setAcademicYear] = useState("");

  const handlePaymentSuccess = () => {
    setSelectedStudent(null);
    setSemester("");
    setAcademicYear("");
  };

  return (
    <>
      <div>
        <h3 className="title">Register a payment</h3>
        <p className="text-text-secondary text-xs md:text-sm">
          Search for a student, then fill in the payment details.
        </p>
      </div>

      <div className="card-top-border space-y-5">
        <StudentSearch
          selectedStudent={selectedStudent}
          onSelectStudent={setSelectedStudent}
        />

        <SemesterYearSelect
          semester={semester}
          academicYear={academicYear}
          onSemesterChange={setSemester}
          onAcademicYearChange={setAcademicYear}
        />

        <PaymentForm
          selectedStudent={selectedStudent}
          semester={semester}
          academicYear={academicYear}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </div>
    </>
  );
}
