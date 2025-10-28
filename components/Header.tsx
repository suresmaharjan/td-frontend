"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky-top bg-white" style={{ zIndex: 50 }}>
      <div className="container d-flex justify-content-between align-items-center py-3 ">
        {/* Logo */}
        <Link
          href="/"
          className="d-flex align-items-center text-decoration-none"
        >
          <Image src="/images/logo.png" width={271} height={51} alt="logo" />
        </Link>

        {/* Desktop Nav */}
        <nav className="d-none d-md-flex gap-4">
          <Link href="/" className="fw-bold">
            Home
          </Link>
          <Link href="/browse" className="fw-bold">
            Browse
          </Link>
          <Link href="/names" className="fw-bold">
            Names
          </Link>
          <Link href="/quiz" className="fw-bold">
            Quiz
          </Link>
        </nav>

        {/* Hamburger for mobile */}
        <button
          className="d-md-none btn p-0 border-0 position-relative"
          style={{ zIndex: 100 }}
          onClick={() => setOpen(!open)}
        >
          <div className="d-flex flex-column gap-1">
            <span
              className="bg-dark rounded"
              style={{
                width: "20px",
                height: "3px",
                transition: "all 0.3s",
                transform: open ? "rotate(45deg) translate(6px, 6px)" : "none",
              }}
            />
            <span
              className="bg-dark rounded"
              style={{
                width: "20px",
                height: "3px",
                transition: "all 0.3s",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="bg-dark rounded"
              style={{
                width: "20px",
                height: "3px",
                transition: "all 0.3s",
                transform: open
                  ? "rotate(-45deg) translate(4px, -5px)"
                  : "none",
              }}
            />
          </div>
        </button>

        {/* Mobile Nav */}
        {open && (
          <>
            <nav
              className="d-md-none position-fixed top-0 end-0 vh-100 w-75 bg-light d-flex flex-column justify-content-center align-items-center gap-4"
              style={{
                backgroundColor: "#e6e6ff",
                zIndex: 20,
                transition: "transform 0.3s",
              }}
            >
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="fw-bold"
              >
                Home
              </Link>
              <Link
                href="/browse"
                onClick={() => setOpen(false)}
                className="fw-bold"
              >
                Browse
              </Link>
              <Link
                href="/names"
                onClick={() => setOpen(false)}
                className="fw-bold"
              >
                Names
              </Link>
              <Link
                href="/quiz"
                onClick={() => setOpen(false)}
                className="fw-bold"
              >
                Quiz
              </Link>
            </nav>

            {/* Overlay */}
            <div
              className="d-md-none position-fixed top-0 start-0 w-100 h-100"
              style={{ backgroundColor: "black", opacity: 0.3, zIndex: 10 }}
              onClick={() => setOpen(false)}
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
