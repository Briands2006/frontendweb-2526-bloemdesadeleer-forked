import { Link, useLocation } from "react-router-dom";

// de css apart importen voor betere leesbaarheid
import "./Navbar.css";

// links naar de paginas
const navLinks = [
  { path: "/", label: "Home" },
  { path: "/calendar", label: "Calendar" },
  { path: "/tracks", label: "Tracks" },
  { path: "/drivers", label: "Drivers"},
  { path: "/teams", label: "Teams"},
  { path: "/news", label: "News" },
  { path: "/about", label: "About" },
  { path: "/login", label: "Login" },

];

export default function Navbar() {
  // Haal de huidige locatie op om actieve links te bepalen (bv ik ben op deze pagina => highlight de link)
  const location = useLocation();

  // Functie om te controleren of een pad actief is
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo-link group">
            <div className="logo-icon-wrapper">
              <span className="logo-text-icon">F1</span>
              <div className="logo-glow" />
            </div>
            <span className="logo-text">Tracker</span>
          </Link>

          <div className="nav-links-wrapper">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${isActive(path) ? "active-link" : ""}`}
              >
                {path === "/login" ? (
                  <svg
                    className="nav-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                ) : (
                  <span className="nav-link-label">{label}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
