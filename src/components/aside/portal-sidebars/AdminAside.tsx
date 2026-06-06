"use client";
import { ADMIN_NAV } from "@/data/aside";
import Aside from "../Aside";

export default function AdminAside() {
  return <Aside portalName="Admin Portal" navLinks={ADMIN_NAV} />;
}
