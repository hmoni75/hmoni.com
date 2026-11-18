import { NavLink } from "react-router-dom";
import { MainMenuRootList } from "@/shared/mobile-menu/MobileMenuCloneContext";

function LinkSwap({ label }: { label: string }) {
  return (
    <span className="at-link-swap">
      <span className="text-1">{label}</span>
      <span className="text-2">{label}</span>
    </span>
  );
}

export default function MainMenu() {
  return (
    <MainMenuRootList>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <LinkSwap label="Home" />
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about-me"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <LinkSwap label="About me" />
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/portfolio"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <LinkSwap label="Works" />
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/pricing"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <LinkSwap label="Pricing" />
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/blog"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <LinkSwap label="Blog" />
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <LinkSwap label="Contact" />
        </NavLink>
      </li>
    </MainMenuRootList>
  );
}
