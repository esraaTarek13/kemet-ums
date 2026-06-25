import { supabase } from "@/lib/supabase/client";

export async function uploadMaterialFile(
  offeringId: string,
  file: File,
): Promise<{ url: string; type: string; size: string }> {
  const courseFolder = offeringId;
  const path = `${courseFolder}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("materials")
    .upload(path, file);

  if (uploadError) throw new Error(uploadError.message);

  const { data: urlData } = supabase.storage.from("materials").getPublicUrl(path);

  return {
    url: urlData.publicUrl,
    type: file.name.split(".").pop() ?? "",
    size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
  };
}

export async function addCourseMaterial(
  offeringId: string,
  title: string,
  file: File,
): Promise<void> {
  const { url, type, size } = await uploadMaterialFile(offeringId, file);

  const { error } = await supabase.rpc("add_course_material", {
    p_offering_id: offeringId,
    p_title: title,
    p_file_url: url,
    p_file_type: type,
    p_file_size: size,
  });

  if (error) throw new Error(error.message);
}

export async function deleteCourseMaterial(materialId: string): Promise<void> {
  const { error } = await supabase.rpc("delete_course_material", {
    p_material_id: materialId,
  });
  if (error) throw new Error(error.message);
}