import CardComponent from "@/components/ui/cards/CardComponent";
import Photo1 from "@/public/images/Photo1.webp";

export type dummySerivcesProps = {
  serviceId: number;
  serviceTitle: string;
  serviceImages?: string[];
  serviceContent?: string;
};
export const dummyServicesData: dummySerivcesProps[] = [
  {
    serviceId: 0,
    serviceTitle: "Hizmet 1",
    serviceImages: [
      Photo1.src,
      Photo1.src,
      Photo1.src,
      Photo1.src,
      Photo1.src,
      Photo1.src,
    ],
    serviceContent:
      "Hizmet 1 uzun içeriği burada yer alacak. Bu alanda hizmet hakkında detaylı bilgi verilebilir. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    serviceId: 1,
    serviceTitle: "Hizmet 2",
    serviceImages: [Photo1.src, Photo1.src, Photo1.src, Photo1.src, Photo1.src],
    serviceContent: "Hizmet 2 kısa içeriği burada yer alacak.",
  },
  {
    serviceId: 2,
    serviceTitle: "Hizmet 3",
    serviceImages: [Photo1.src, Photo1.src, Photo1.src, Photo1.src],
  },
  {
    serviceId: 3,
    serviceTitle: "Hizmet 4",
    serviceImages: [Photo1.src, Photo1.src, Photo1.src],
  },
  {
    serviceId: 7,
    serviceTitle: "Hizmet 8",
  },
  {
    serviceId: 8,
    serviceTitle: "Hizmet 9",
  },
  {
    serviceId: 9,
    serviceTitle: "Hizmet 10",
  },
  {
    serviceId: 4,
    serviceTitle: "Hizmet 5",
  },
  {
    serviceId: 5,
    serviceTitle: "Hizmet 6",
  },
  {
    serviceId: 6,
    serviceTitle: "Hizmet 7",
  },
];
// sort
export const sortedServicesData = dummyServicesData.toSorted(
  (a, b) => b.serviceId - a.serviceId
);
export default function ServicesPage() {
  return (
    <div className="max-w-[85%] min-h-[90vh] mx-auto mt-12">
      <div className="flex flex-col justify-center">
        <div>
          <h1 className="text-3xl font-bold tracking-wider mb-4 text-center text-(--color-primary)">
            Hizmetlerimiz
          </h1>
          <h5 className="text-center font-medium tracking-wide text-(--color-primary)">
            Hizmetlerimize buradan ulaşabilirsiniz
          </h5>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-20 my-20">
          {sortedServicesData.map((service, index) => (
            <CardComponent
              key={index}
              title={service.serviceTitle}
              href={`/services/${service.serviceTitle}`}
              image={service.serviceImages?.[0]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
