"use client";
import { ADMIN_NAV } from "@/data/aside";
import Aside from "../Aside";

// Role-specific wrapper — passes portal config to the shared Aside component
export default function AdminAside() {
  return <Aside portalName="Admin Portal" navLinks={ADMIN_NAV} />;
}
