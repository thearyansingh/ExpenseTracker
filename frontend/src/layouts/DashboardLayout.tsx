import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

function DashboardLayout() {

  return (

    <div className="min-h-screen bg-zinc-950 text-white flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;