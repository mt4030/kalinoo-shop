
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../../../../@/components/ui/carousel";
import CarouselDots from "@/components/shared/carousel/CarouselDots";


type ProductGalleryProps = {
  images: string[];
};

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState("");
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    setSelectedImage(images[0] ?? "");
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-[12px] bg-zinc-100">
        No images available
      </div>
    );
  }

  return (
    <div className="w-full sm:w-100">
      <div className="hidden h-100 w-full items-center justify-center rounded-[12px] border border-zinc-200 bg-white p-5 sm:flex">
        <img
          src={selectedImage}
          alt="Product"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="relative mt-4 sm:px-10">
        <Carousel setApi={setApi}>
          <CarouselContent className="-ml-2">
            {images.map((image, index) => (
              <CarouselItem
                key={`${image}-${index}`}
                className="basis-full pl-2 sm:basis-1/4"
                onClick={() => setSelectedImage(image)}
              >
                <div
                  className={`flex cursor-pointer  items-center justify-center rounded-[12px]  p-2 transition sm:h-20 ${
                    selectedImage === image
                      ? " sm:border-8   border-blue-500/20  "
                      : "border-none sm:border-zinc-200 sm:hover:border-zinc-400"
                  }`}
                >
                  <img
                    src={image}
                    alt="Product"
                    className="h-full w-full object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselDots
            classname="sm:hidden"
            slides={images}
            api={api}
          />
        </Carousel>
      </div>
    </div>
  );
}
