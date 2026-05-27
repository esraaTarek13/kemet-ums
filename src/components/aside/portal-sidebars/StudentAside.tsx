"use client"
import { STUDENT_NAV } from "@/data/aside";
import Aside from "../Aside";

export default function StudentAside() {
  return <Aside portalName="Student Portal" navLinks={STUDENT_NAV} />;
}
