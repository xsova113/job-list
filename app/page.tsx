"use client";

import { List } from "@/components/list";
import { IData } from "@/type";
import axios from "axios";
import { useEffect, useState } from "react";
import { StylesConfig } from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import qs from "query-string";
import { usePathname, useRouter } from "next/navigation";

const colorStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    border: "none",
    height: "60px",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    background: "#5ba4a4",
    ":hover": { background: "#2c3a3a" },
    transition: "ease-in-out",
    color: "white",
  }),
};

export default function Home({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState<IData[]>();
  const [isPending, setIsPending] = useState(true);
  const animatedComponents = makeAnimated();
  const [selected, setSelected] =
    useState<{ label: string; value: string }[]>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      axios
        .get("data.json")
        .then((res) => setData(res.data))
        .finally(() => setIsPending(false));
    }, 250);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          query: selected?.map((item) => item.value),
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  }, [pathname, router, searchParams.query, selected]);

  if (isPending)
    return (
      <main className="mx-5 mt-12 flex flex-col items-center justify-center md:mx-20">
        <List.Skeleton />
      </main>
    );

  const options = [
    ...data!.map((item) => ({
      value: item.position.toLowerCase(),
      label: item.position,
    })),
  ];

  const filteredData = !searchParams.query
    ? data
    : data?.filter(
        (item) =>
          searchParams.query
            .toString()
            .toLowerCase()
            .includes(item.company.toLowerCase()) ||
          item.position
            .toLowerCase()
            .replaceAll(" ", "")
            .includes(
              searchParams.query.toString().toLowerCase().replaceAll(" ", ""),
            ) ||
          item.tools
            .map((tool) => tool.toLowerCase())
            .toString()
            .includes(searchParams.query.toString().toLowerCase()) ||
          item.languages
            .map((lang) => lang.toLowerCase())
            .toString()
            .includes(searchParams.query.toString().toLowerCase()),
      );

  if (!filteredData)
    return (
      <main className="mt-12 flex flex-col items-center justify-center">
        No jobs found...
      </main>
    );

  return (
    <main className="relative mx-5 flex flex-col items-center justify-center md:mx-20">
      <CreatableSelect
        options={options}
        isMulti
        className="absolute -top-8 z-20 w-full rounded bg-white shadow-lg"
        styles={colorStyles}
        components={animatedComponents}
        placeholder="Search keywords"
        onChange={(e: any) => setSelected(e)}
      />
      <List items={filteredData} />
    </main>
  );
}
