import { MessageReadStatus } from "@/types";
import { format } from "date-fns";
import Image from "next/image";

export default function UserRow({ user }: { user: MessageReadStatus }) {
  return (
    <div className="flex justify-between gap-2 items-center" role="listitem">
      <div className="flex items-center gap-3 py-2">
        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center shrink-0 overflow-hidden">
          {user.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt={user.full_name}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="text-sm font-medium text-accent"
              aria-hidden="true"
            >
              {user.full_name.charAt(0)}
            </span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{user.full_name}</p>
          <p className="text-xs text-text-secondary capitalize">{user.role}</p>
        </div>
      </div>
      <time
        className="text-xs text-text-subtle shrink-0"
        dateTime={user.read_at ?? undefined}
      >
        {user.read_at ? format(new Date(user.read_at), "hh:mm") : "—"}
      </time>
    </div>
  );
}
