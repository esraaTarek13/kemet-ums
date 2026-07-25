import { CourseOfferingDetailResponse } from "@/types";
import { supabase } from "@/lib/supabase/client";

export async function getCourseOfferingDetail(
  offeringId: string,
): Promise<CourseOfferingDetailResponse> {
  const { data, error } = await supabase.rpc("get_course_offering_detail", {
    p_offering_id: offeringId,
  });
  if (error) throw new Error(error.message);
  return data as CourseOfferingDetailResponse;
}
