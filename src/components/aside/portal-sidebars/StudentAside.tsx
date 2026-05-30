"use client";
import { STUDENT_NAV } from "@/data/aside";
import Aside from "../Aside";

// Role-specific wrapper — passes portal config to the shared Aside component
export default function StudentAside() {
  return <Aside portalName="Student Portal" navLinks={STUDENT_NAV} />;
}
