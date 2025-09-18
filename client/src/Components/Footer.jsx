import React from "react";
// import "./Footer.css"; // external CSS

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Left: */}
        <div className="footer-col">
          <h4 className="footer-title">CONNECT WITH US</h4>
          <p>📞 +91 1231231231</p>
          <p>✉️ info@deepnetsoft.com</p>
        </div>

        {/* Middle:  */}
        <div className="footer-col footer-center">
          <img src="/logo.png" alt="Deep Net Soft" className="footer-logo" />
          <h3 className="footer-brand">
            DEEP NET <span>SOFT</span>
          </h3>
          <div className="footer-social">
            <a href="#">🌐</a>
            <a href="#">🐦</a>
            <a href="#">📘</a>
          </div>
        </div>

        {/* Right: Location */}
        <div className="footer-col">
          <h4 className="footer-title">FIND US</h4>
          <p>
            First floor, Geo Infopark,
            <br />
            Infopark EXPY, Kakkanad
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Deepnetsoft Solutions. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
