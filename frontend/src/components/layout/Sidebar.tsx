import { NavLink } from "react-router-dom";

import { navLinks } from "@/lib/navigation";

function Sidebar() {

  return (

    <aside
      className="
      hidden md:flex
      w-64
      flex-col
      border-r
      border-zinc-800
      bg-zinc-900
      p-5
    "
    >

      {/* Logo */}
      <div className="mb-10">

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
                hover:translate-x-1

                ${isActive
                  ? "bg-violet-600 text-white shadow-lg"
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

    </aside>
  );
}

export default Sidebar;