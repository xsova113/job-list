import { IData } from "@/type";
import { Skeleton } from "./ui/skeleton";
import { ListCard } from "./list-card";
import { MobileListCard } from "./mobile-list-card";
import { useMediaQuery } from "usehooks-ts";

interface ListProps {
  items: IData[];
}

export const List = ({ items }: ListProps) => {
  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <div className="mb-24 w-full space-y-14 md:space-y-7">
      {items.map((item) => (
        <>
          {matches ? (
            <ListCard key={item.id} item={item} />
          ) : (
            <MobileListCard key={item.id} item={item} />
          )}
        </>
      ))}
    </div>
  );
};

List.Skeleton = function ListSkeleton() {
  return (
    <div className="w-full space-y-7">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-[300px] bg-gray-500/50 md:h-[110px]" />
      ))}
    </div>
  );
};
