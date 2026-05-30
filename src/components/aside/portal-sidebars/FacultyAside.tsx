"use client";
import { FACULTY_NAV } from "@/data/aside";
import Aside from "../Aside";

// Role-specific wrapper — passes portal config to the shared Aside component
export default function FacultyAside() {
  return <Aside portalName="Faculty Portal" navLinks={FACULTY_NAV} />;
}
