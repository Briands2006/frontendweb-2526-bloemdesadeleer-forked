import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {new Date().getFullYear()} F1 Tracker. All rights reserved.
        </p>
        <br></br>
        <p className="footer-text">
          This website is an independent, unofficial project and is not affiliated in any way with the Formula 1
          group of companies, the FIA, or any related entity. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD
          CHAMPIONSHIP, GRAND PRIX, and other related trademarks are registered trademarks of Formula One Licensing
          B.V. GPL-3.0
        </p>
      </div>
    </footer>
  );
}
