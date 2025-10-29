import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import "./Navbar.css";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/calendar", label: "Calendar" },
  { path: "/tracks", label: "Tracks" },
  { path: "/drivers", label: "Drivers" },
  { path: "/teams", label: "Teams" },
  { path: "/news", label: "News" },
  { path: "/about", label: "About" },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser, logout } = useAuth();

  const isActive = (path) =>
    location.pathname.startsWith(path) &&
    (location.pathname.length === path.length ||
      location.pathname[path.length] === "/");

  const dynamicNavLinks = currentUser
    ? [...navLinks, { path: "/profile", label: "Profile", isAuth: true }]
    : [...navLinks, { path: "/login", label: "Login", isAuth: true }];

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
    } catch (e) {
      console.error("Fout bij uitloggen:", e);
    }
  };

  const renderAuthLink = (link) => {
    if (currentUser && link.path === "/profile") {
      return (
        <Link
          key={link.path}
          to={link.path}
          onClick={() => setMenuOpen(false)}
          className={`nav-link ${isActive(link.path) ? "active-link" : ""}`}
        >
          <User className="nav-icon" size={20} />
        </Link>
      );
    }

    if (!currentUser && link.path === "/login") {
      return (
        <Link
          key={link.path}
          to={link.path}
          onClick={() => setMenuOpen(false)}
          className={`nav-link ${isActive(link.path) ? "active-link" : ""}`}
        >
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
        </Link>
      );
    }
    return null;
  };

  const renderLogoutButton = () => {
    if (currentUser) {
      return (
        <button onClick={handleLogout} className="nav-link logout-button">
          <LogOut className="nav-icon" size={20} />
        </button>
      );
    }
    return null;
  };
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
            {dynamicNavLinks.map((link) => {
              // Als het een auth-link is (Login/Profile), gebruik de speciale renderer
              if (link.isAuth) {
                return renderAuthLink(link);
              }

              // Render de standaardlinks
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`nav-link ${
                    isActive(link.path) ? "active-link" : ""
                  }`}
                >
                  <span className="nav-link-label">{link.label}</span>
                </Link>
              );
            })}

            {/* Voeg de uitlogknop toe (alleen als ingelogd) */}
            {renderLogoutButton()}
          </div>
        </div>
      </div>
    </nav>
  );
}
