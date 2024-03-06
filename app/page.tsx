"use client";

import { List } from "@/components/list";
import { useEffect, useState } from "react";
import { StylesConfig } from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import qs from "query-string";
import { usePathname, useRouter } from "next/navigation";
import { useFetchData } from "@/hooks/useFetchData";

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
  const animatedComponents = makeAnimated();
  const [selected, setSelected] =
    useState<{ label: string; value: string }[]>();

  const { data, isPending, filteredData } = useFetchData(
    "data.json",
    searchParams.query,
  );

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
