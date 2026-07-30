import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addCourseMaterial } from "@/lib/services/faculty/materials";
import { facultyCoursesKeys } from "./queryKeys";

export function useAddMaterial(offeringId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ title, file }: { title: string; file: File }) =>
            addCourseMaterial(offeringId, title, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: facultyCoursesKeys.detailAll });
            toast.success("Material added successfully");
        },
        onError: (err: Error) =>
            toast.error(err.message ?? "Failed to add material"),
    });
}