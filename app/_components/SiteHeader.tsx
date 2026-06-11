"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { text: "Corporate",   href: "https://www.medlockandthames.com/corporate-currency" },
  { text: "Personal",    href: "https://www.medlockandthames.com/personal-currency" },
  { text: "Finance",     href: "https://www.medlockandthames.com/business-finance" },
  { text: "Apps vs. Us", href: "https://www.medlockandthames.com/where-apps-fall-short" },
  { text: "Partners",    href: "https://www.medlockandthames.com/partnership" },
  { text: "Insights",    href: "https://www.medlockandthames.com/insights" },
  { text: "About",       href: "https://www.medlockandthames.com/about" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Body scroll lock while mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const y = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, y);
    };
  }, [mobileOpen]);

  const HamburgerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="4" x2="20" y2="20" />
      <line x1="20" y1="4" x2="4" y2="20" />
    </svg>
  );

  return (
    <>
      <header style={{ background: "#0B1F3A", position: "sticky", top: 0, zIndex: 50 }}>
        <nav
          aria-label="Main navigation"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          {/* Logo */}
          <a
            href="https://www.medlockandthames.com"
            aria-label="Medlock &amp; Thames — home"
            style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            <Image
              src="/logo.png"
              alt="Medlock &amp; Thames"
              width={200}
              height={59}
              style={{ width: 180, height: "auto" }}
              priority
            />
          </a>

          {/* Desktop nav links */}
          <ul className="mt-nav-list" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.text}>
                <a href={link.href} className="mt-nav-link">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a href="https://www.medlockandthames.com/contact" className="mt-nav-cta">
            GET LIVE QUOTE
          </a>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="mt-hamburger"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </nav>

        {/* Accent bar */}
        <div style={{ height: 2, background: "linear-gradient(90deg, #21a9ee 0%, #1a85c0 100%)" }} />
      </header>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-label="Mobile navigation"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(11,31,58,0.98)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            padding: "0 24px 32px",
            overflowY: "auto",
          }}
        >
          {/* Close row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", height: 64, flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", padding: 8, lineHeight: 1 }}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Nav links */}
          <nav aria-label="Mobile navigation" style={{ flex: 1 }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {NAV_LINKS.map((link) => (
                <li key={link.text} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "14px 0",
                      color: "rgba(255,255,255,0.85)",
                      textDecoration: "none",
                      textTransform: "uppercase",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile CTA */}
          <div style={{ flexShrink: 0, marginTop: 24 }}>
            <a
              href="https://www.medlockandthames.com/contact"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "14px 0",
                border: "2px solid #21a9ee",
                background: "transparent",
                color: "white",
                textTransform: "uppercase",
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              GET LIVE QUOTE
            </a>
          </div>
        </div>
      )}
    </>
  );
}
