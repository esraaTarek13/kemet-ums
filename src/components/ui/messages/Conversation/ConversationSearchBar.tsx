import { FiSearch } from "react-icons/fi";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function ConversationSearchBar({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 bg-bg-card rounded-lg px-4 py-2 shadow-[0_0_10px_#0000000D]">
      <label htmlFor="CourseSearch" className="sr-only">Search</label>
      <FiSearch aria-hidden="true" className="text-border text-sm shrink-0" />
      <input
        id="CourseSearch"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search conversations..."
        className="bg-transparent text-xs md:text-sm text-border w-full outline-none"
      />
    </div>
  );
}