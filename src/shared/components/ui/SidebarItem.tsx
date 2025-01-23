"use client";
import { cn } from "@/shared/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";

interface Props {
  label: string;
  icon: LucideIcon;
  href: string;
}

const SidebarItem: React.FC<Props> = ({ href, icon: Icon, label }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const activePath = pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex gap-x-2 mt-2 text-slate-700 dark:text-white text-sm items-center hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer",
        activePath && "bg-slate-400/20"
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1} />
      {label}
    </Link>
  );
};

export default SidebarItem;
