
import { useEffect, useState } from "react";

export default function CarouselDots({slides,api,classname}){
const [current, setCurrent] = useState(0)

useEffect(() => {
  if (!api) return

  setCurrent(api.selectedScrollSnap())

  api.on("select", () => {
    setCurrent(api.selectedScrollSnap())
  })
}, [api])




return(
<div   className={`left-1/2 -translate-x-1/2 bottom-5 sm:bottom-10 flex justify-center gap-2 sm:mt-4 absolute `}>
  {slides.map((slide, index) => (
    <button
      key={slide.id}
      onClick={() => api?.scrollTo(index)}
      className={  `${classname || ""} h-2 w-2 rounded-full ${
        current === index ? "bg-purple-500 w-5 " : "bg-gray-400"
      }`}
      aria-label={`Go to slide ${index + 1}`}
    />
  ))}
</div>

)


}
