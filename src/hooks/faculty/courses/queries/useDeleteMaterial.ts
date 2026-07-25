import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCourseMaterial } from "@/lib/services/faculty/materials";
import { facultyCoursesKeys } from "./queryKeys";

export function useDeleteMaterial() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (materialId: string) => deleteCourseMaterial(materialId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: facultyCoursesKeys.detail(),
            });
            toast.success("Material deleted");
        },
        onError: (err: Error) =>
            toast.error(err.message ?? "Failed to delete material"),
    });
}