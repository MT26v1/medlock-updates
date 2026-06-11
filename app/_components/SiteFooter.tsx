import React from "react";

const LEGAL_LINKS = [
  { label: "Regulatory Info", href: "https://www.medlockandthames.com/regulatory-info" },
  { label: "Privacy Policy",  href: "https://www.medlockandthames.com/privacy-policy" },
  { label: "Complaints",      href: "https://www.medlockandthames.com/complaints" },
  { label: "Briefing",        href: "https://www.medlockandthames.com/briefing" },
  { label: "Contact Us",      href: "https://www.medlockandthames.com/contact" },
];

const SOCIAL = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/medlockandthames", icon: "/LI.svg" },
  { label: "X",         href: "https://x.com/medlockthames",                       icon: "/x.svg"  },
  { label: "Facebook",  href: "https://www.facebook.com/medlockandthames",          icon: "/FB.svg" },
  { label: "Instagram", href: "https://www.instagram.com/medlockandthames",         icon: "/IG.svg" },
];

export function SiteFooter() {
  return (
    <footer style={{ background: "#0B1F3A", position: "relative", flexShrink: 0 }}>

      {/* Background image — desktop only (hidden on mobile via CSS) */}
      <div
        className="footer-image-bg"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/Towers.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />
      {/* Navy overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(11,31,58,0.94)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "48px 24px 32px" }}>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 32,
          }}
        >
          {/* Left — heading + CTA buttons */}
          <div style={{ flex: "1 1 360px", minWidth: 0 }}>
            <h2
              className="mt-footer-heading"
              style={{
                fontFamily: "var(--font-ubuntu)",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 400,
                color: "#F7F4EE",
                margin: "0 0 20px",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
              }}
            >
              Ready to talk to someone who knows the market?
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <a href="https://www.medlockandthames.com/contact" className="mt-footer-btn">
                BOOK A CONSULTATION
              </a>
              <a href="tel:+441612503375" className="mt-footer-btn">
                TEL +44(0)161 250 3375
              </a>
            </div>
          </div>

          {/* Right — social + legal */}
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            {/* Social icons */}
            <div className="mt-footer-social-icons" style={{ display: "flex", gap: 14 }}>
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Medlock & Thames on ${s.label}`}
                  className="social-icon"
                >
                  <img src={s.icon} alt="" width={28} height={28} style={{ display: "block" }} />
                </a>
              ))}
            </div>

            {/* Legal links row */}
            <div
              className="mt-footer-legal-row"
              style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}
            >
              {LEGAL_LINKS.map((link, i) => (
                <React.Fragment key={link.href}>
                  <a href={link.href} className="mt-footer-link">{link.label}</a>
                  {i < LEGAL_LINKS.length - 1 && (
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <p className="mt-footer-legal-text" style={{ margin: 0, fontSize: "0.7rem", fontWeight: 400, color: "rgba(255,255,255,0.5)", textAlign: "right" }}>
              ICO No. ZA532056 | Company No. 11973815
            </p>
            <address className="mt-footer-legal-text" style={{ fontStyle: "normal", margin: 0, fontSize: "0.7rem", fontWeight: 400, color: "rgba(255,255,255,0.5)", textAlign: "right" }}>
              Adamson House, Towers Business Park, Didsbury, Manchester M20 2YY
            </address>
            <p className="mt-footer-legal-text" style={{ margin: 0, fontSize: "0.7rem", fontWeight: 400, color: "rgba(255,255,255,0.5)", textAlign: "right" }}>
              &copy; 2026 Medlock &amp; Thames&trade;
            </p>
          </div>
        </div>

        {/* Blue divider */}
        <div style={{ height: 1, background: "#21a9ee", marginTop: 28 }} />
      </div>
    </footer>
  );
}
