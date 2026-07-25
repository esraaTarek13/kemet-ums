import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: adminId } = await params;

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

  if (requesterProfile?.role !== "super_admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { full_name, phone, nationality, address, status } = body;

  if (!full_name || !status) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const { data: updated, error: rpcError } = await supabase.rpc(
    "update_admin_profile",
    {
      p_admin_id: adminId,
      p_full_name: full_name,
      p_phone: phone ?? null,
      p_nationality: nationality ?? null,
      p_address: address ?? null,
      p_status: status,
    },
  );

  if (rpcError) {
    return NextResponse.json({ error: rpcError.message }, { status: 400 });
  }

  const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
    adminId,
    { ban_duration: status === "suspended" ? "876000h" : "none" },
  );

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }

  return NextResponse.json({ admin: updated });
}
