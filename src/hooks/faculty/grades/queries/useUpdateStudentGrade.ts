import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { updateStudentGrade } from "@/lib/services/faculty/grades";
import { UpdateGradeData } from "@/types/faculty/grades";

export function useUpdateStudentGrade() {
    const { user } = useAuthStore();

    return useMutation({
        mutationFn: (data: UpdateGradeData) =>
            updateStudentGrade(user?.id ?? "", data.enrollmentId, {
                quiz: data.quiz,
                midterm: data.midterm,
                final: data.final,
            }),
    });
}