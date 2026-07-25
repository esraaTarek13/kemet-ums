import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: facultyId } = await params;

  const supabase = await createClient();
  const {
    data: { user: requester },
  } = await supabase.auth.getUser();

  if (!requester) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: requesterProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", requester.id)
    .single();

  if (
    requesterProfile?.role !== "admin" &&
    requesterProfile?.role !== "super_admin"
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error: validationError } = await supabase.rpc("delete_faculty", {
    p_faculty_id: facultyId,
  });

  if (validationError) {
    return NextResponse.json(
      { error: validationError.message },
      { status: 400 },
    );
  }

  const { error: deleteError } =
    await supabaseAdmin.auth.admin.deleteUser(facultyId);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
