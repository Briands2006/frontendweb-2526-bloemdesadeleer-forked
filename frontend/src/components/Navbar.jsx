import { useLocation } from 'react-router-dom';

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
        <h1>Test for navbar</h1>
    );
}