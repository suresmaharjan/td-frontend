"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [lang, setLang] = useState("तामाङ - नेपाली");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Close dropdown on outside click or Escape
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
    router.push(`/dictionary/${lang}/?q=${encodeURIComponent(search.trim())}`);
  };

  const languages = ["तामाङ - नेपाली", "नेपाली - तामाङ", "अंग्रेजी - नेपाली"];

  return (
    <nav className="bg-primary py-4">
      <div className="container">
        <form
          className="position-relative d-flex align-items-center mx-auto bg-white rounded shadow-sm px-2 py-2"
          onSubmit={handleSubmit}
        >
          {/* Dropdown inside input (left side) */}
          <div className="position-relative" ref={dropdownRef}>
            <button
              type="button"
              className="btn btn-primary  rounded-1  d-flex align-items-center"
              onClick={() => setOpen((s) => !s)}
              style={{ fontWeight: "500" }}
            >
              {lang}
              <i className="bi bi-caret-down-fill ms-1" style={{ fontSize: "0.7rem" }}></i>
            </button>

            <ul
              className={`dropdown-menu${open ? " show" : ""}`}
              role="menu"
              style={{ minWidth: "5rem" }}
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

          {/* Input Field */}
          <input
            className="form-control border-0 flex-grow-1 px-3"
            type="search"
            placeholder="Search here"
            aria-label="Search"
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              boxShadow: "none",
              outline: "none",
              backgroundColor: "transparent",
            }}
          />

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "24px",
              backgroundColor: "#ccc",
            }}
          ></div>

          {/* Search icon button */}
          <button
            type="submit"
            className="btn border-0 bg-transparent text-success d-flex align-items-center"
          >
            <i className="bi bi-search" style={{ fontSize: "1.2rem" }}></i>
          </button>
        </form>
      </div>
    </nav>
  );
}
