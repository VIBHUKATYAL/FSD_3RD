import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  DoorOpen,
  Calendar,
  Settings,
  Zap,
} from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Rooms Overview", path: "/rooms", icon: DoorOpen },
    { name: "Lecturers", path: "/lecturers", icon: Users },
    { name: "Schedule", path: "/schedule", icon: Calendar },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-highlight p-2 rounded-lg">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">CampusSpace</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-brand text-white font-medium shadow-md" : "text-gray-300 hover:bg-accent hover:text-white"}`}
              >
                <Icon
                  className={`h-5 w-5 ${isActive ? "text-highlight" : ""}`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-accent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-sm font-bold">
              AI
            </div>
            <div>
              <p className="text-sm font-medium">Administrator</p>
              <p className="text-xs text-gray-400">admin@college.edu</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full bg-background overflow-y-auto w-full">
        <header className="bg-surface border-b border-gray-100 py-4 px-8 flex justify-between items-center shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-primary">
              {location.pathname === "/"
                ? "Dashboard"
                : navItems.find((n) => n.path === location.pathname)?.name}
            </h2>
            <p className="text-sm text-gray-500">
              B.Tech Academic Control Panel
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500">
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </header>

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
