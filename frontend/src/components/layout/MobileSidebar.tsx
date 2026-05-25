import {
  Menu,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { NavLink } from "react-router-dom";

import { navLinks } from "@/lib/navigation";

function MobileSidebar() {

  return (

    <Sheet>

      {/* Hamburger Button */}
      <SheetTrigger asChild>

        <button
          className="
          md:hidden
          p-2
          rounded-lg
          hover:bg-zinc-800
          transition-all
        "
        >

          <Menu size={24} />

        </button>

      </SheetTrigger>

      {/* Sidebar Drawer */}
      <SheetContent
        side="left"
        className="
        w-72
        border-zinc-800
        bg-zinc-900
        text-white
      "
      >

        {/* Logo */}
        <div className="mb-10 mt-4">

          <h1
            className="
            text-3xl
            font-bold
            bg-gradient-to-r
            from-violet-500
            to-indigo-500
            bg-clip-text
            text-transparent
          "
          >
            SpendWise
          </h1>

        </div>

        {/* Navigation */}
        <nav className="space-y-2">

          {navLinks.map((link) => {

            const Icon = link.icon;

            return (

              <NavLink
                key={link.title}
                to={link.path}

                className={({ isActive }) => `
                  
                  flex items-center gap-3
                  rounded-xl
                  px-4 py-3

                  transition-all duration-300

                  hover:bg-zinc-800

                  ${isActive
                    ? "bg-violet-600 text-white"
                    : "text-zinc-300"
                  }
                `}
              >

                <Icon size={20} />

                <span className="font-medium">

                  {link.title}

                </span>

              </NavLink>
            );
          })}

        </nav>

      </SheetContent>

    </Sheet>
  );
}

export default MobileSidebar;