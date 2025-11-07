"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface SearchItem {
  id: number;
  // add other fields like title, description if your API has them
}

export default function Search() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const lang = searchParams.get("lang") || "";

  const [data, setData] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noMatch, setNoMatch] = useState<boolean>(false);

  const fetchData = async () => {
    if (!keyword || !lang) return;
    setLoading(true);
    setNoMatch(false);

    try {
      const res = await axios.get(`/api/apisearch`, {
        params: { lang, keyword },
      });
      const result = res.data.data || [];
      setData(result);
      setNoMatch(result.length === 0);
    } catch (err) {
      console.error("Error fetching search data:", err);
      setNoMatch(true);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lang, keyword]);

  // Loading spinner
  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-secondary fs-5">Searching...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3 className="mb-4 text-center">
        Search Results for "<span className="text-primary">{keyword}</span>"
      </h3>

      {noMatch ? (
        <div className="text-center mt-5">
          <p className="fs-5 text-muted">No matching results found.</p>
        </div>
      ) : (
        <div className="row">
          {data.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="card shadow-sm p-3 h-100">
                <p className="mb-0 fw-bold">ID: {item.id}</p>
                {/* You can display more data here, e.g. title, meaning, etc. */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
