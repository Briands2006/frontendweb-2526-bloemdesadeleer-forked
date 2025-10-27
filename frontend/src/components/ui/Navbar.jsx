import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/calendar", label: "Calendar" },
  { path: "/tracks", label: "Tracks" },
  { path: "/drivers", label: "Drivers" },
  { path: "/teams", label: "Teams" },
  { path: "/news", label: "News" },
  { path: "/about", label: "About" },
  { path: "/login", label: "Login" },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (path) =>
    location.pathname.startsWith(path) &&
    (location.pathname.length === path.length ||
      location.pathname[path.length] === "/");

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
          <button
            className="navbar-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          <div className={`nav-links-wrapper ${menuOpen ? "open" : ""}`}>
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)} // sluit menu na klikken door op fals e te zetten
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
