"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import Ripple from "material-ripple-effects";

export default function SearchBar() {
  const [lang, setLang] = useState("तामाङ - नेपाली");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  //   const ripple = new Ripple();

  // close on outside click or Escape
  useEffect(() => {
    function onDocClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    // navigate client-side without full reload
    router.push(`/dictionary/${lang}/?q=${encodeURIComponent(search.trim())}`);
  };

  const languages = ["तामाङ - नेपाली", "नेपाली - तामाङ", "अंग्रेजी - नेपाली"];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary  shadow-sm py-3">
      <div className="container d-flex align-items-center">
        {/* Custom React Dropdown */}
        <div className="position-relative me-2" ref={dropdownRef}>
          <button
            type="button"
            className="btn btn-light dropdown-toggle"
            onClick={() => setOpen((s) => !s)}
          >
            {lang}
          </button>

          <ul
            className={`dropdown-menu${open ? " show" : ""}`}
            role="menu"
            style={{ minWidth: "6rem" }}
          >
            {languages.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  className={`dropdown-item${code === lang ? " active" : ""}`}
                  onClick={() => {
                    setLang(code);
                    setOpen(false);
                  }}
                >
                  {code}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Search Form */}
        <form className="position-relative flex-grow-1" onSubmit={handleSubmit}>
          <input
            className="form-control pe-5" // add right padding for the icon space
            type="search"
            placeholder="Search here"
            aria-label="Search"
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Icon Button inside input */}
          <button
            type="submit"
            className="btn position-absolute top-50 end-0 translate-middle-y pe-3 border-0 bg-transparent shadow-none no-hover"
            // onMouseDown={(e) => ripple.create(e, "secondary")}
          >
            <i className="bi bi-search text-secondary"></i>
          </button>
        </form>
      </div>
    </nav>
  );
}
