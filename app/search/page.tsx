"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";

function EnglishWord({ item }: { item: any }) {
  return (
    <div className="card p-3 shadow-sm bg-blue-50">
      English
      <h5>{item.word_en}</h5>
      {item.word_ro && <p>Romanized: {item.word_ro}</p>}
    </div>
  );
}

function TamangWord({ item }: { item: any }) {
  return (
    <div className="card p-3 shadow-sm bg-yellow-50">
      Tamang
      <h5>{item.word_ta}</h5>
      {item.word_ipa && <p>IPA: {item.word_ipa}</p>}
    </div>
  );
}

function NepaliWord({ item }: { item: any }) {
  return (
    <div className="card p-3 shadow-sm">
      Nepali
      <h5>{item.word_np}</h5>
      {item.grammar && <p>Grammar: {item.grammar}</p>}
    </div>
  );
}

export default function Search() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const lang = searchParams.get("lang");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [noMatch, setNoMatch] = useState<boolean>(false);

  const fetchData = async () => {
    if (!keyword || !lang) return;
    setLoading(true);
    setNoMatch(false);

    try {
      const res = await axios.get(
        `/api/apisearch?lang=${lang}&keyword=${keyword}`
      );
      const result = res.data.data;
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
  console.log(data);
  useEffect(() => {
    fetchData();
  }, [lang, keyword]);

  // Loading spinner
  if (loading) {
    return <Loader />;
  }

  // Mapping lang to data field
  const langMap = {
    nepali: "word_np",
    tamang: "word_ta",
    english: "word_en",
  };

  const selectedField = langMap[lang] || "word_en";

  return (
    <div className="w-100">
      <h4 className=" text-primary">
        परिणाम : <span className="">{keyword}</span>
      </h4>
      <hr className="border-3 text-primary mb-4 opacity-100" />
      {noMatch ? (
        <div className="text-center mt-5">
          <p className="fs-5 text-muted">No matching results found.</p>
        </div>
      ) : (
        <div className="row">
          {data.map((item) => (
            <div key={item.id} className="col-12 mb-3">
              {/* Render different components depending on lang */}
              {lang === "nepali" && <NepaliWord item={item} />}
              {lang === "tamang" && <TamangWord item={item} />}
              {lang === "english" && <EnglishWord item={item} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
