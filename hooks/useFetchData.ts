import { IData } from "@/type";
import axios from "axios";
import { useEffect, useState } from "react";

export function useFetchData(url: string) {
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

  return { data, isPending };
}
