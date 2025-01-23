import Navbar from "@/shared/components/ui/Navbar";
import Sidebar from "@/shared/components/ui/Sidebar";
import { useAuthStore } from "@/store/auth/auth.store";
import { Navigate, Outlet } from "react-router";

const AdminDashboard = () => {
  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  if (authStatus === "pending") {
    checkAuthStatus();
    return <p>Loading...</p>;
  }

  if (authStatus === "unauthorized") {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="flex w-full h-full">
      <div className="hidden xl:block w-80 h-full xl:fixed">
        <Sidebar />
      </div>
      <div className="w-full xl:ml-80">
        <Navbar />
        <div className="p-6 bg-[#fafbfc] dark:bg-secondary">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
