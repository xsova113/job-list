import { IData } from "@/type";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";
import qs from "query-string";

interface ListCardProps {
  item: IData;
}

export const ListCard = ({ item }: ListCardProps) => {
  const mergedList: string[] = [
    item.role,
    item.level,
    ...item.languages,
    ...item.tools,
  ];

  const handleClick = (tool: string) => {};

  return (
    <div
      className={cn(" w-full rounded-md bg-white p-5 shadow-xl", {
        "border-l-4 border-primary": item.featured,
      })}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-x-3">
          <Image
            src={`/images/${item.company.toLowerCase().replaceAll(" ", "-").replaceAll(".", "")}.svg`}
            height={100}
            width={100}
            className="rounded-full"
            alt={item.company}
          />

          <div className="flex cursor-pointer flex-col justify-center gap-y-2.5 text-sm">
            <div className="flex items-center gap-x-2 font-bold text-primary">
              <h1>{item.company}</h1>
              {item.new && (
                <Badge className="rounded-full bg-primary text-[#eef6f6]">
                  NEW!
                </Badge>
              )}
              {item.featured && (
                <Badge className="rounded-full bg-black text-white hover:bg-black">
                  FEATURED
                </Badge>
              )}
            </div>
            <h2 className="text-lg font-bold">{item.position}</h2>
            <div className="flex items-center gap-x-4 text-muted-foreground">
              <span>{item.postedAt}</span>•<span>{item.contract}</span>•
              <span>{item.location}</span>
            </div>
          </div>
        </div>

        <div className="space-x-2">
          {mergedList.map((tool) => (
            <Badge
              className="cursor-pointer"
              key={tool}
              onClick={() => handleClick(tool)}
            >
              {tool}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
