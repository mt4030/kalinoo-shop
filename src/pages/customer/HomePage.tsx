import { HeroCarousel } from "@/components/shared/carousel/HeroCarousel";
import Imageadfeture from "@/components/shared/ImageAdFeature";
import Category from "@/features/categories/components/CategoriesIcon";
import { CarouselCategory } from "@/features/categories/components/CategoryCarousel";





export default function HomePage(){


return(

<div className="mb-50">
<HeroCarousel/>


<div className="flex-1 mx-auto w-full max-w-360 px-4 md:px-6 lg:px-8">
<CarouselCategory category="smartphones" />
<Imageadfeture/>
<CarouselCategory category="groceries" />
<Category/>
<CarouselCategory category="groceries" />
<CarouselCategory category="laptops" />
<Imageadfeture/>
<CarouselCategory category="sunglasses" />
</div>


</div>
   
)

}