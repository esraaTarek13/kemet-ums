import { FiAlertTriangle, FiInfo, FiAlertCircle } from "react-icons/fi";

export const PRIORITY_CONFIG = {
  urgent: {
    icon: FiAlertTriangle,
    className: "bg-red-100 text-red-500",
  },
  important: {
    icon: FiAlertCircle,
    className: "bg-amber-100 text-amber-500",
  },
  normal: {
    icon: FiInfo,
    className: "bg-blue-100 text-blue-500",
  },
};

export const STATUS_CONFIG = {
  active: {
    label: "active",
    className: "bg-green-100 text-green-600",
  },
  scheduled: {
    label: "scheduled",
    className: "bg-blue-100 text-blue-600",
  },
  expired: {
    label: "expired",
    className: "bg-gray-100 text-gray-500",
  },
};