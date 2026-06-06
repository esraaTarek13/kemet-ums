"use client";
import { FACULTY_NAV } from "@/data/aside";
import Aside from "../Aside";

export default function FacultyAside() {
  return <Aside portalName="Faculty Portal" navLinks={FACULTY_NAV} />;
}
