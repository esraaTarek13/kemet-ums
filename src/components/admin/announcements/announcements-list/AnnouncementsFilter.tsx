import { filterOptions } from "@/data/admin/announcementTabsConfig";
import { AnnouncementStatusFilter } from "@/types";

interface FilterTabsProps {
  value: "all" | AnnouncementStatusFilter;
  onChange: (value: "all" | AnnouncementStatusFilter) => void;
}

export default function AnnouncementsFilter({
  value,
  onChange,
}: FilterTabsProps) {
  return (
    <div
      role="group"
      aria-label="Filter announcements by status"
      className="w-fit bg-bg-filter p-1 rounded-xl"
    >
      {filterOptions.map((state) => (
        <button
          key={state.id}
          type="button"
          aria-pressed={value === state.id}
          onClick={() => onChange(state.id)}
          className={`text-xs font-medium uppercase py-2 px-4 md:px-6 rounded-xl cursor-pointer transition-colors ${
            value === state.id ? "bg-accent text-text-white" : "text-text-muted"
          }`}
        >
          {state.label}
        </button>
      ))}
    </div>
  );
}
