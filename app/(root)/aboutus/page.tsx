import { aboutUs } from "./aboutusConsts.js";

export default function AboutUsPage() {
  return (
    <div
      className="max-w-[85%] min-h-[90vh] mx-auto flex justify-center mt-6 mb-14 md:mt-0">
      <div className="flex flex-col max-w-[800px] gap-8 justify-center">
        {aboutUs?.map((data, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
            <div>
              <h1 className="text-[40px] font-semibold text-(--color-primary) text-center">
                {data?.title}
              </h1>
            </div>
            <div>
              <p className="text-[18px] font-semibold text-(--color-primary) text-center">
                {data?.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
