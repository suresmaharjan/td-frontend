"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Donors() {
  const { data, isPending, error } = useQuery({
    queryKey: ["donors"],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/donors`);
        console.log("Full API response:", res.data);
      return res.data;
      // adjust based on what you see
    },
  });

  return (
    
    <div className="row">
      <div className="col-12">
        <h1 className="text-primary mb-3 ">आर्थिक सहयोगीहरु</h1>
      </div>
      {data?.map((item) => (
        <div className="col-md-4 mb-4 ">
          <img
            src={`${process.env.NEXT_PUBLIC_HOST}/uploads/donors/${item.photo}`}
            className="border rounded-1"
          />
          <h5 className="mt-2 mb-0 text-primary">{item.sponser_name}</h5>
          <small>{item.title}</small>
          <h6 className="text-primary">{item.amount}</h6>
        </div>
      ))}
    </div>
  );
}
