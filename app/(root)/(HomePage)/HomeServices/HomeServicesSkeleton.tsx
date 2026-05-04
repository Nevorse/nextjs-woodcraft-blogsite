export default function HomeServicesSliderSkeleton() {
  return (
    <div className="w-[92%] mx-auto flex">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`flex flex-col items-center justify-center m-8 w-full
            ${i === 2 ? "hidden min-[700px]:flex" : ""}
            ${i === 3 ? "hidden min-[1280px]:flex" : ""}
          `}
        >
          <div className="w-full h-[240px] lg:h-[320px] mb-4 bg-(--theme-tertiary)/30 animate-pulse" />
          <div className="h-6 w-32 bg-(--theme-tertiary)/30 animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
}
