import { AdminProfileResponse } from "@/types";
import { format } from "date-fns";

type Profile = AdminProfileResponse;

export function mapToBannerItems(profile?: Profile) {
  return {
    name: profile?.full_name ?? "—",
    email: profile?.email ?? "—",
    createdAt: profile?.created_at,
    avatarUrl: profile?.avatar_url ?? null,
  };
}

export function mapToAcademicItems(profile?: Profile) {
  return [
    { label: "Email", value: profile?.email ?? "—" },
    { label: "Role", value: profile?.role ?? "—" },
    {
      label: "Date Joined",
      value: profile?.created_at
        ? format(new Date(profile.created_at), "MMM d, yyyy")
        : "—",
    },
    { label: "Last Login", value: profile?.nationality ?? "—" },
  ];
}

export function mapToPersonalItems(profile?: Profile) {
  return [
    { label: "Full Name", value: profile?.full_name ?? "—" },
    { label: "Phone Number", value: profile?.phone ?? "—" },
    { label: "Address", value: profile?.address ?? "—" },
    { label: "Nationality", value: profile?.nationality ?? "—" },
  ];
}
