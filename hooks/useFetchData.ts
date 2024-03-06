import { IData } from "@/type";
import axios from "axios";
import { useEffect, useState } from "react";

export function useFetchData(url: string, query?: string) {
  const [data, setData] = useState<IData[]>();
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      axios
        .get(url)
        .then((res) => setData(res.data))
        .finally(() => setIsPending(false));
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [url]);

  const filteredData = !query
    ? data
    : data?.filter(
        (item) =>
          item.company.toLowerCase().includes(query.toString().toLowerCase()) ||
          item.position
            .toLowerCase()
            .replaceAll(" ", "")
            .includes(query.toString().toLowerCase().replaceAll(" ", "")) ||
          item.tools
            .map((tool) => tool.toLowerCase())
            .toString()
            .includes(query.toString().toLowerCase()) ||
          item.languages
            .map((lang) => lang.toLowerCase())
            .toString()
            .includes(query.toString().toLowerCase()),
      );

  return { data, isPending, filteredData };
}
