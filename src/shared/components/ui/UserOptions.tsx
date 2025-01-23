import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/shadcn/dropdown-menu";
import { useAuthStore } from "@/store/auth/auth.store";
import { MoreHorizontal } from "lucide-react";

const UserOptions = () => {
  const logoutUser = useAuthStore((state) => state.logoutUser);

  const handleLogOut = () => {
    logoutUser();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreHorizontal className="rotate-90 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogOut}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserOptions;
