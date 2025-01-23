import Logo from "@/shared/components/ui/Logo";
import SidebarRoutes from "@/shared/components/ui/SidebarRoutes";

const Sidebar = () => {
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col border-r">
        <div className="flex items-center justify-center pt-4">
          <Logo />
        </div>
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
