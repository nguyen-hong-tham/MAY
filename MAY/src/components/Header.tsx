import { NavLink } from "react-router-dom";


function Header() {
  return (
    <header className="flex items-center justify-between pb-4">
      <div className="flex items-center gap-1.5 text-base font-extrabold text-neutral-900">
        <span className="text-4xl">☕</span>
        <span className="text-4xl">
          M<span className="text-orange-400">A</span>Y
        </span>
      </div>

      <nav className="flex gap-8 text-xl text-neutral-600 font-medium">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-orange-400 pb-2 text-neutral-900"
              : "pb-2 hover:text-neutral-900 transition"
          }
        >
          Home
        </NavLink>

        <NavLink to="/order" className="pb-2 hover:text-neutral-900 transition">
          Order
        </NavLink>

        <NavLink to="/about" className="pb-2 hover:text-neutral-900 transition">
          About
        </NavLink>

        <NavLink to="/cart" className="pb-2 hover:text-neutral-900 transition">
          Cart
        </NavLink>
      </nav>

      <div className="flex items-center gap-3">
  <NavLink
    to="/login"
    className="flex items-center gap-3 rounded-full bg-orange-400 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:-translate-y-[1px]"
  >
    Login/Register
  </NavLink>
</div>
      
    </header>
  );
}

export default Header;