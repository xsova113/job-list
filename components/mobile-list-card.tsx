import { cn } from "@/lib/utils";
import { IData } from "@/type";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface MobileListCardProps {
  item: IData;
}

export const MobileListCard = ({ item }: MobileListCardProps) => {
  const mergedList: string[] = [
    item.role,
    item.level,
    ...item.languages,
    ...item.tools,
  ];

  return (
    <div
      className={cn(
        "relative flex h-[300px] flex-col gap-y-4 mt-8 rounded-md bg-white p-5 shadow-xl",
        { "border-l-4 border-primary": item.featured },
      )}
    >
      <Image
        src={`/images/${item.company.toLowerCase().replaceAll(" ", "-").replaceAll(".", "")}.svg`}
        height={70}
        width={70}
        className="absolute -top-8 left-4 rounded-full"
        alt={item.company}
      />

      <div className="mt-10 flex items-center gap-x-2 font-bold text-primary">
        <h1>{item.company}</h1>
        {item.new && (
          <Badge className="rounded-full bg-primary text-[#eef6f6]">NEW!</Badge>
        )}
        {item.featured && (
          <Badge className="rounded-full bg-black text-white hover:bg-black">
            FEATURED
          </Badge>
        )}
      </div>

      <h2 className="cursor-pointer text-lg font-bold">{item.position}</h2>

      <div className="flex  cursor-pointer items-center gap-x-4 text-sm text-muted-foreground">
        <span>{item.postedAt}</span>•<span>{item.contract}</span>•
        <span>{item.location}</span>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3.5">
        {mergedList.map((tool) => (
          <Badge className="cursor-pointer" key={tool}>
            {tool}
          </Badge>
        ))}
      </div>
    </div>
  );
};
