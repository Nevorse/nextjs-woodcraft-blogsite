import CardComponent from "@/components/ui/cards/CardComponent";
import { sortedServicesData } from "@/lib/database/dummyDbData";

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
