import { Input } from "@/shared/components/shadcn/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shared/components/shadcn/sheet";
import SidebarRoutes from "@/shared/components/ui/SidebarRoutes";
import ToggleTheme from "@/shared/components/ui/ToggleTheme";
import UserOptions from "@/shared/components/ui/UserOptions";
import {
  DotIcon,
  Menu,
  MoreHorizontal,
  MoreHorizontalIcon,
  Search,
} from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center px-2 gap-x-4 md:px-6 justify-between xl:justify-end w-full bg-background border-b h-20">
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex gap-x-2 items-center">
        <ToggleTheme />
        <UserOptions />
      </div>
    </div>
  );
};

export default Navbar;
