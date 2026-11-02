import { slides } from "./slides"
import { HeroSlide } from "./HeroSlide"
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../../../@/components/ui/carousel"
import {  useState } from "react";
import CarouselDots from "./CarouselDots";

export function HeroCarousel() {
const [api, setApi] = useState<CarouselApi>()



  return (
    <Carousel className="w-full  mb-20"
  opts={{
    loop: true,
  }}
  plugins={[
    Autoplay({
      delay: 5000,
    }),
  ]}
  setApi={setApi}
    
    >
      
      <CarouselContent className="h-50 sm:h-64 md:h-80 lg:h-100 ">
        {slides.map((slide) => (
            
          <CarouselItem key={slide.id}>
            <HeroSlide slide={slide} />
          </CarouselItem>
        ))}
      </CarouselContent>

<CarouselDots slides={slides} api={api} classname={''} />

<CarouselPrevious className="left-70 hidden sm:block hover:bg-gray-200 hover:text-gray-900  rounded top-auto bottom-10 translate-y-0"/>
<CarouselNext className="left-80 hidden sm:block hover:bg-gray-200 hover:text-gray-900   rounded right-auto top-auto bottom-10 translate-y-0"/>

    </Carousel>
  )
}


