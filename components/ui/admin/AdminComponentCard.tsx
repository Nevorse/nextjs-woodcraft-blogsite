import Image from "next/image";
import SmoothLink from "../general/SmoothLink";

export default function AdminComponentCard({
  title,
  href,
  image,
}: {
  title: string;
  href: string;
  image: string;
}) {
  return (
    <div className="flex flex-col gap-3 2xl:w-[450px] w-[350px]">
      <SmoothLink href={href}>
        <Image
          className="w-full 2xl:h-[380px] h-[300px] object-center object-cover"
          alt={title}
          src={image}
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