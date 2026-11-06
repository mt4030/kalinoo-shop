import { useEffect, useState } from "react";
import type { CarouselDotsProps } from "@/types";

export default function CarouselDots({
  slides,
  api,
  classname,
}: CarouselDotsProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    handleSelect();

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <div
      className={`
        absolute bottom-5 left-1/2
        flex -translate-x-1/2
        justify-center gap-2
        sm:bottom-10 sm:mt-4
        ${classname ?? ""}
      `}
    >
      {slides.map((_, index) => (
        <button
          key={`dot-${index}`}
          type="button"
          onClick={() => api?.scrollTo(index)}
          className={`
            h-2 rounded-full
            transition-all duration-200
            ${
              current === index
                ? "w-5 bg-[#2457D6]"
                : "w-2 bg-gray-400"
            }
          `}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={current === index ? "true" : undefined}
        />
      ))}
    </div>
  );
}