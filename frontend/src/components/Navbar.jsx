import { Link, useLocation } from 'react-router-dom';

// de css apart importen voor betere leesbaarheid
import './Navbar.css';

// links naar de paginas 
const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/standings', label: 'Standings' },
    { path: '/calendar', label: 'Calendar' },
    { path: '/tracks', label: 'Tracks' },
    { path: '/predictions', label: 'Predictions' },
    { path: '/blog', label: 'News' },
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
                            {/* Using a simple 'F1' text logo for max simplicity */}
                            <span className="text-2xl font-black text-red-500 group-hover:scale-110 transition-all relative z-10">F1</span>
                            <div className="logo-glow" />
                        </div>
                        <span className="logo-text">
                            Racing Hub
                        </span>
                    </Link>

                    <div className="nav-links-wrapper">
                        {navLinks.map(({ path, label }) => {
                            const active = isActive(path);
                            return (
                                <Link
                                    key={path}
                                    to={path}
                                    className={`nav-link ${active ? 'active-link' : ''}`}
                                >
                                    <span className="nav-link-label">{label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}