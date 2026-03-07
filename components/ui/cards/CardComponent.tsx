import Image from "next/image";
import SmoothLink from "../general/SmoothLink";
import Photo1 from "@/public/images/Photo1.webp";

export default function CardComponent({
  title,
  href,
  image,
}: {
  title: string;
  href: string;
  image: string | undefined;
}) {
  return (
    <div className="flex flex-col gap-3 2xl:w-[450px] w-[350px]">
      <SmoothLink href={href}>
        <Image
          className="w-full 2xl:h-[380px] h-[300px] object-center object-cover"
          alt={title}
          src={image || Photo1.src}
          width={450}
          height={380}
        />
      </SmoothLink>
      <div className="text-2xl my-l overflow-hidden text-(--color-primary)">
        <SmoothLink href={href}>
          <h1 className="truncate text-left w-fit cursor-pointer underline underline-offset-4 decoration-(--theme-tertiary) decoration-1">
            {title}
          </h1>
        </SmoothLink>
      </div>
    </div>
  );
}
