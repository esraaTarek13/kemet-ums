"use client"
import { SUPER_ADMIN_NAV } from "@/data/aside";
import Aside from "../Aside";

export default function SuperAdminAside() {
  return <Aside portalName="Admin Portal" navLinks={SUPER_ADMIN_NAV} />;
}
