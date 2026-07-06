import { useAddMaterial } from "@/hooks/faculty/useMaterials";
import {
  AddMaterialFormValues,
  addMaterialSchema,
} from "@/validation/faculty/submitFile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export function useAddMaterialForm(offeringId: string, onClose: () => void) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddMaterialFormValues>({
    resolver: zodResolver(addMaterialSchema),
  });

  const { mutate: addMaterial, isPending } = useAddMaterial(offeringId);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const onSubmit = useCallback(
    (data: AddMaterialFormValues) => {
      // file is a FileList — extract the first item before sending
      addMaterial(
        { title: data.title, file: data.file[0] },
        { onSuccess: handleClose },
      );
    },
    [addMaterial, handleClose],
  );

  return {
    register,
    handleSubmit,
    watch,
    errors,
    isPending,
    onSubmit,
    handleClose,
  };
}
