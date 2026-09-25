import { NavLink, Outlet } from "react-router";
import AuthIntro from "../components/AuthIntro/AuthIntro";

export default function AuthLayout() {
  return (
    <>
        <main className="flex min-h-screen items-center justify-center bg-[#F0F2F5]">
        <div className="grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-5 lg:gap-4 lg:py-0">
          <div className="order-2 flex w-full items-center justify-center lg:order-1 lg:col-span-3">
                <AuthIntro/>
            </div>

            <div className="order-1 my-0 flex w-full max-w-xl flex-col items-center justify-center rounded-3xl bg-white px-4 py-6 sm:px-6 lg:order-2 lg:col-span-2 lg:my-12">
              <div className="mb-5 flex w-full max-w-md gap-1 rounded-xl bg-slate-100 p-1 shadow-sm">
                <NavLink
                  to="/auth/login"
                  className={({ isActive }) =>
                    `flex-1 rounded-lg px-4 py-2.5 text-center text-sm font-bold transition ${isActive
                      ? "bg-white text-main shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/auth/register"
                  className={({ isActive }) =>
                    `flex-1 rounded-lg px-4 py-2.5 text-center text-sm font-bold transition ${isActive
                      ? "bg-white text-main shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                    }`
                  }
                >
                  Register
                </NavLink>
              </div>

              <div className="w-full">
                <Outlet />
              </div>
            </div>
        </div>
        
    </main>
    
    </>
  )
}
