import { Flag, Twitter, Github, Instagram, Linkedin } from "lucide-react";
import "./Footer.css";

// betere help functie dan implementeren in de grote blok zelf
const getCurrentYear = () => new Date().getFullYear();

export default function Footer() {

  // door deze in lijsten te steken kan je ze gemakkelijk editen en aanmaken
  const companyLinks = [
    { name: "About Us", href: "/about" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/f1", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/f1", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/", label: "GitHub" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
                
        <div className="footer-main-grid">
              
          <div className="footer-brand-column">
            <div className="footer-logo">
              <span className='footer-f1'>F1</span>
              <span className="footer-brand-text">
                Tracker
              </span>
            </div>
            <p className="footer-text-secondary">
              Your ultimate source for F1 data, analysises, and race insights.
            </p>
          </div>
          {/* Zelfde stijl als de navbar, je mapt de lijst uit en geeft alles zijn eigen items. */}
          <div className="footer-link-column">
            <h3 className="footer-heading">
              Company
            </h3>
            <ul className="footer-link-list">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="footer-link-item"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-link-column">
            <h3 className="footer-heading">
              Legal
            </h3>
            <ul className="footer-link-list">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="footer-link-item"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom-section">
                  
          <div className="footer-disclaimer-wrapper">
            <p className="footer-text">
              {/* Kan dus ook gewoon met &copy; */}
              &copy; {getCurrentYear()} F1 Racing Hub. All rights reserved.
            </p>
            {/* gwn voor funsies */}
            <p className="footer-text footer-disclaimer">
              This website is an independent, unofficial project and is not affiliated in any way with the Formula 1
              group of companies, the FIA, or any related entity. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD
              CHAMPIONSHIP, GRAND PRIX, and other related trademarks are registered trademarks of Formula One Licensing
              B.V. GPL-3.0
            </p>
          </div>

          <div className="footer-social-icons">
            {socialLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`Follow us on ${link.label}`}
                className="footer-social-icon-link"
              >
                <link.icon className="footer-social-icon" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
