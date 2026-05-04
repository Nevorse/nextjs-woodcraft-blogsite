"use client";
import CardComponent from "@/components/ui/cards/CardComponent";
// import { motion } from "motion/react";
import { usePathname } from "next/navigation";

type ItemDataType = {
  id: string;
  title: string;
  order: number;
  slug: string;
  computedImageHref?: string | undefined | null;
  images?: { uuid: string }[];
  folderImage?: { uuid: string } | null;
  [key: string]: unknown;
};
type AlbumsClientProps = {
  itemsData: ItemDataType[];
  mode: "folders" | "albums" | "albumsInFolder";
};

export default function AlbumsClient({ itemsData = [], mode }: AlbumsClientProps) {
  const pathname = usePathname();
  const getImageUuid = (item: ItemDataType, mode: string) => {
    if (mode === "folders") {
      return item.folderImage?.uuid;
    }
    return item.images?.[0]?.uuid;
  };
  const processedItems = itemsData.map((item) => ({
    ...item,
    computedImageHref: getImageUuid(item, mode),
  }));

  // const containerAnimation = {
  //   hidden: {},
  //   visible: {
  //     transition: {
  //       staggerChildren: 0.1,
  //     },
  //   },
  // };

  // const itemAnimation = {
  //   hidden: {
  //     opacity: 0,
  //     y: 10,
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //   },
  // };
  
  return (
    // <motion.div initial="hidden" animate="visible" variants={containerAnimation}>
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-20 my-20">
      {processedItems.map((item) => (
        // <motion.div variants={itemAnimation} key={item.id}>
        <CardComponent
          key={item.id}
          title={item.title}
          href={`${pathname}/${item.slug}`}
          imagePath={item.computedImageHref}
        />
        // </motion.div>
      ))}
    </div>
    // </motion.div>
  );
}
