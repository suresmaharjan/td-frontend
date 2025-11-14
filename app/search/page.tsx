"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";

function EnglishWord({ item }: { item: any }) {
  return (
    <div className="pb-3 border-bottom">
      <div className="h5">
        <span className="text-warning">{item.word_en}</span>&nbsp;
        <span className="text-info">{item.grammar}</span>&nbsp;
        <span>{item.word_np}</span> - &nbsp;
        <span className="text-info">{item.word_ta}</span>
      </div>
      <div>
        <span className="text-info">
          <i>Origin</i>
        </span>
        &nbsp;
        <span className="text-warning">
          <i>[{item.word_origin === "E" ? "पूर्वेलि " : "पश्चिमेलि"}]</i>
        </span>
      </div>
    </div>
  );
}

function TamangWord({ item }: { item: any }) {
  return (
    <div className="pb-3 border-bottom">
      <div className="h5">
        <span className="text-warning">{item.word_ta}</span>&nbsp;
        <span className="text-info">{item.grammar}</span>&nbsp;
        <span>{item.word_np}</span>
      </div>
      <div>
        <span className="text-info">
          <i>Origin</i>
        </span>
        &nbsp;
        <span className="text-warning">
          <i>[{item.word_origin === "E" ? "पूर्वेलि " : "पश्चिमेलि"}]</i>
        </span>
      </div>
    </div>
  );
}

function NepaliWord({ item }: { item: any }) {
  return (
    <div className="pb-3 border-bottom">
      <div className="h5">
        <span className="text-warning">{item.word_np}</span>&nbsp;
        <span className="text-info">{item.grammar}</span>&nbsp;
        <span>{item.word_ta}</span>
      </div>
      <div>
        <span className="text-info">
          <i>Origin</i>
        </span>
        &nbsp;
        <span className="text-warning">
          <i>[{item.word_origin === "E" ? "पूर्वेलि " : "पश्चिमेलि"}]</i>
        </span>
      </div>
    </div>
  );
}

export default function Search() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const lang = searchParams.get("lang");

  const { data, isPending, error } = useQuery({
    queryKey: ["search", lang, keyword],
    queryFn: async () => {
      const res = await axios.get(
        `https://tamangdictionary.com/api/apisearch?lang=${lang}&keyword=${keyword}`
      );
      console.log("Full API response:", res.data.data);
      // adjust based on what you see
      return Array.isArray(res.data) ? res.data : res.data.data;
    },
    enabled: !!lang && !!keyword,
  });

  if (isPending) return <Loader />;
  if (error) return <div>Error fetching data.</div>;

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center mt-5">
        <p className="fs-5 text-muted">No matching results found.</p>
      </div>
    );
  }

  return (
    <div className="w-100">
      <div className="col-12 mb-3">
        {lang === "nepali" && (
          <div>
            <span className="h3 text-primary"> नेपाली - तामाङ</span>&nbsp;
            <span className="h4 text-muted">Nepali to Tamang</span>
          </div>
        )}

        {lang === "tamang" && (
          <div>
            <span className="h3 text-primary"> तामाङ - नेपाली</span>&nbsp;
            <span className="h4 text-muted">Tamang to Nepali</span>
          </div>
        )}
        {lang === "english" && (
          <div>
            <span className="h3 text-primary">अंग्रेजी</span>&nbsp;
            <span className="h4 text-muted">English to Nepali / Tamang</span>
          </div>
        )}
      </div>
      <div>
        <span className="h3 text-primary">परिणाम : </span>&nbsp;
        <span className="h4 text-muted">{keyword}</span>
      </div>
      <hr className="border-3 text-primary mb-3 opacity-100" />
      <div className="row">
        {data.map((item) => (
          <div key={item.id} className="col-12 mb-3">
            {lang === "nepali" && <NepaliWord item={item} />}
            {lang === "tamang" && <TamangWord item={item} />}
            {lang === "english" && <EnglishWord item={item} />}
          </div>
        ))}
      </div>
    </div>
  );
}
