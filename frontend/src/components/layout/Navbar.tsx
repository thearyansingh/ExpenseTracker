import { Bell } from "lucide-react";

import MobileSidebar
from "./MobileSidebar";

function Navbar() {

  return (

    <header
      className="
      sticky top-0 z-40

      h-16
      border-b
      border-zinc-800

      bg-zinc-900/80
      backdrop-blur-md

      px-4 md:px-6

      flex items-center justify-between
    "
    >

      {/* Left */}
      <div className="flex items-center gap-3">

        <MobileSidebar />

        <h2 className="text-lg md:text-xl font-semibold">

          Dashboard

        </h2>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        <button
          className="
          p-2
          rounded-full

          hover:bg-zinc-800
          transition-all duration-300
        "
        >

          <Bell size={20} />

        </button>

        {/* Avatar */}
        <div
          className="
          h-10 w-10

          rounded-full

          bg-gradient-to-r
          from-violet-500
          to-indigo-500

          flex items-center justify-center

          font-bold
        "
        >
          A
        </div>

      </div>

    </header>
  );
}

export default Navbar;