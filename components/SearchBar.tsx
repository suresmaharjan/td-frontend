"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function SearchBar() {
  const [lang, setLang] = useState("english");
  const [keyword, setKeyword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        // `https://tamangdictionary.com/api/apisearch?lang=${lang}&keyword=${keyword}`
        `api/apisearch?lang=${lang}&keyword=${keyword}`
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const languages = ["तामाङ - नेपाली", "नेपाली - तामाङ", "अंग्रेजी - नेपाली"];

  return (
    <nav className="bg-primary py-3">
      <div className="container">
        <form
          className="position-relative d-flex align-items-center mx-auto bg-white rounded shadow-sm px-2 py-1"
          onSubmit={handleSubmit}
        >
          <div className="position-relative">
            <select
              className="form-select lang-select text-white  bg-primary border-0  px-3 py-2"
              style={{ minWidth: "145px" }}
              onChange={(e) => setLang(e.target.value)}
            >
              {/* {languages.map((lang) => (
                <option key={lang} value={lang}>
                    {lang}
                </option>
              ))} */}
              <option value="english">अंग्रेजी - नेपाली</option>
              <option value="tamang">तामाङ - नेपाली</option>
              <option value="nepali">नेपाली - तामाङ</option>
            </select>
          </div>

          {/* Input Field */}
          <input
            className="form-control border-0 flex-grow-1 px-3 search-input"
            type="search"
            placeholder="Search here"
            required
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              boxShadow: "none",
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
            <i className="bi bi-search" style={{ fontSize: "24px" }}></i>
          </button>
        </form>
      </div>
    </nav>
  );
}
