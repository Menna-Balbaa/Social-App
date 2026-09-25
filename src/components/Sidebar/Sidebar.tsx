import { Newspaper, Sparkles, Bookmark, Globe2 } from "lucide-react";
import { NavLink } from "react-router";

const items = [
  { label: "Feed", icon: Newspaper, path: "/feed" },
  { label: "My Posts", icon: Sparkles, path: "/feed/my-posts" },
  { label: "Community", icon: Globe2, path: "/feed/community" },
  { label: "Saved", icon: Bookmark, path: "/feed/saved" },
];

export default function Sidebar() {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-3xl bg-white p-2 shadow-lg sm:grid-cols-4 lg:grid-cols-1 lg:p-3">
      {items.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          end
          className={({ isActive }) =>
            isActive
              ? "flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-50 px-2 py-3 text-center text-xs font-bold text-blue-500 cursor-pointer sm:text-sm lg:justify-start lg:px-4 lg:text-left"
              : "flex w-full items-center justify-center gap-2 rounded-2xl px-2 py-3 text-center text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer sm:text-sm lg:justify-start lg:px-4 lg:text-left"
          }
        >
          <item.icon size={22} />
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}