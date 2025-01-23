import { Navigate, Outlet } from "react-router";
import bgLogin from "@/assets/images/bg-login.png";
import { useAuthStore } from "@/store/auth/auth.store";

const Auth = () => {
  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  if (authStatus === "pending") {
    checkAuthStatus();
    return <p>Loading...</p>;
  }

  if (authStatus === "authorized") {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex flex-[50%] xl:flex-[60%] justify-center items-center bg-red-300">
        <img src={bgLogin} className="w-full h-screen" />
      </div>
      <div className="flex-1 lg:flex-[50%] xl:flex-[40%] flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
