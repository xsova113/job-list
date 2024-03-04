import Image from "next/image";

export const BgHeader = () => {
  return (
    <div>
      <div className="relative hidden h-[156px] w-full bg-[#5ba4a4] sm:block">
        <Image src={"/images/bg-header-desktop.svg"} fill alt="bg-header" />
      </div>
      <div className="relative block h-[156px] w-full bg-[#5ba4a4] sm:hidden">
        <Image src={"/images/bg-header-mobile.svg"} fill alt="bg-header" />
      </div>
    </div>
  );
};
