import SidebarItem from "@/shared/components/ui/SidebarItem";
import { Building2, PanelsTopLeft } from "lucide-react";

const dataGeneral = [
  { icon: PanelsTopLeft, label: "Dashboard", href: "/admin/" },
  { icon: Building2, label: "Notes", href: "/admin/notes" },
];

const SidebarRoutes = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="p-2 md:p-6">
        <p className="text-slate-500 mb-2">GENERAL</p>
        {dataGeneral.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>

      <div className="text-center p-6">
        <footer className="mt-3 p-3 text-center">
          &copy; {new Date().getFullYear()} DixonDev All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default SidebarRoutes;
