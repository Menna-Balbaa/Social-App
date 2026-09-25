import { Users, Search, UserPlus, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const friends = [
  { name: "Ahmed Abd Al-Muttalib", handle: "ahmedmutti", followers: 216 },
  { name: "Alaa Ashraf", handle: "alaaashraf", followers: 167 },
  { name: "abdalla diaa", handle: "abdalla_diaa", followers: 90 },
];

export default function SuggestionsSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-3xl bg-white p-3 shadow-lg">
      {/* header */}
      <div className="mb-5 flex items-center gap-3">
        <Users size={20} className="text-blue-500" />
        <h2 className="flex-1 text-base font-bold text-slate-900">
          Suggested Friends
        </h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-sm font-bold text-slate-600">
          5
        </span>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Hide suggested friends" : "Show suggested friends"}
          onClick={() => setIsOpen((open) => !open)}
          className="flex items-center gap-1 rounded-lg px-1.5 py-1 text-xs font-bold text-blue-500 hover:bg-blue-50 lg:hidden"
        >
          <span className=" sm:inline">{isOpen ? "Hide" : "Show"}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <div className={isOpen ? "block" : "hidden lg:block"}>
      {/* search */}
      <div className="relative mb-5">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          placeholder="Search friends..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm placeholder:text-slate-400"
        />
      </div>

      {/* list */}
      <div className="space-y-4">
        {friends.map((friend) => (
          <div
            key={friend.handle}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                {friend.name[0].toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-900">
                  {friend.name}
                </p>
                <p className="truncate text-xs text-slate-400">@{friend.handle}</p>
              </div>

              <button className="flex shrink-0 items-center gap-1.5 cursor-pointer rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-500 hover:bg-blue-100">
                <UserPlus size={14} />
                Follow
              </button>
            </div>

            <span className="mt-3 inline-block rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
              {friend.followers} followers
            </span>
          </div>
        ))}
      </div>

      {/* footer */}
      <button className="mt-4 w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-100">
        View more
      </button>
      </div>
    </div>
  );
}