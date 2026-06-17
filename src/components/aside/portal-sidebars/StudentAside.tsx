"use client";
import { STUDENT_NAV } from "@/data/shared/aside";
import Aside from "../Aside";

export default function StudentAside() {
  return <Aside portalName="Student Portal" navLinks={STUDENT_NAV} />;
}
