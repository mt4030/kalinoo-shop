
import { HeroCarousel } from "../../components/carousel/HeroCarousel";
import { CarouselCategory } from "@/components/category carosels/catcarosel";
import Imageadfeture from "@/components/imageadfeture";
import Category from "@/components/categoriesicon";




export default function HomePage(){


return(

<div className="mb-50">
<HeroCarousel/>


<div className="flex-1 mx-auto w-full max-w-360 px-4 md:px-6 lg:px-8">
<CarouselCategory category="smartphones" />
<Imageadfeture/>
<CarouselCategory category="beauty" />
<Category/>
<CarouselCategory category="groceries" />
<CarouselCategory category="laptops" />
<Imageadfeture/>
<CarouselCategory category="sunglasses" />
</div>


</div>
   
)

}