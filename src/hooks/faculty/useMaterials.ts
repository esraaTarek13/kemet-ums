import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addCourseMaterial, deleteCourseMaterial } from "@/lib/services/faculty/materials";

export function useAddMaterial(offeringId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, file }: { title: string; file: File }) =>
      addCourseMaterial(offeringId, title, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculty-course-detail"] });
      toast.success("Material added successfully");
    },
    onError: (err: Error) => toast.error(err.message ?? "Failed to add material"),
  });
}

export function useDeleteMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (materialId: string) => deleteCourseMaterial(materialId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculty-course-detail"] });
      toast.success("Material deleted");
    },
    onError: (err: Error) => toast.error(err.message ?? "Failed to delete material"),
  });
}