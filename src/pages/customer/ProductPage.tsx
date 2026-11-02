
import ProductGallery from "@/features/products/components/ProductGallery";
import ProductTopBar from "@/features/products/components/ProductTop";
import { useProduct } from "@/features/products/hooks/useProduct";
import Reviewsection from "@/features/reviews/components/ReviewSection";
import { useParams } from "react-router-dom"


export default function ProductPage(){

const {id}=useParams()
  const productId = Number(id);
const{data, isPending, isError, error}=useProduct(productId)

if (!id || !Number.isInteger(productId) || productId <= 0) {
  return <p>شناسه محصول معتبر نیست.</p>;
}

if (isPending) return <p>در حال بارگذاری محصول...</p>;

if (isError) return <p>{error.message}</p>;

if (!data) return <p>محصول پیدا نشد.</p>;

return(
  <>  
  <div className="flex-1 mx-auto w-full max-w-360 px-4 md:px-6 lg:px-8">

<ProductTopBar/>
<div className=" flex flex-col sm:flex-row
  gap-8 rounded-2xl text-right mt-10 border border-zinc-200 bg-white p-6">
{/* Purchase / stock information */}

  <div className="flex  fixed w-full z-50 bottom-0 left-0 right-0 sm:static sm:w-64 flex-col align-end  rounded-xl bg-zinc-50 p-5">
    

    <div className="mb-4 hidden sm:block border-b  border-zinc-200 pb-4">
      <span className="text-sm text-zinc-500">
        گارانتی
      </span>

      <div className="mt-1 hidden sm:block text-sm font-medium text-zinc-800">
        {data.warranty_information}
      </div>
    </div>

    <div className="mb-6 hidden  sm:block">
      <span className="text-sm text-zinc-500">
        ارسال
      </span>

      <div className="mt-1 hidden sm:block text-sm font-medium text-zinc-800">
        {data?.shipping_information}
      </div>
    </div>

    <div className="mt-auto  border-t border-zinc-200 pt-5">
      <div className="mb-4 text-lg font-bold text-zinc-800">
        قیمت با درصد تخفیف{data?.price}
      </div>

      <button className="w-full rounded-xl bg-purple-600 py-3 font-bold text-white transition hover:bg-purple-700">
        افزودن به سبد خرید
      </button>
    </div>
    
  </div>
  {/* Product information */}
  <div className="order-2 flex flex-1 flex-col justify-start pt-3 sm:order-none">
    <div className="mb-3 text-sm font-medium text-purple-600">
      {data?.brand}
    </div>

    <div className="mb-5 text-2xl font-bold text-zinc-900">
      {data?.title}
    </div>

    <div className="flex items-center gap-4 border-b border-zinc-200 pb-5">
      <span className="rounded-lg bg-yellow-50 px-3 py-1 text-sm font-bold text-yellow-700">
        {data?.rating}
      </span>

      
    </div>
  </div>

  
   {/* Product gallery */}
   <div className="order-1 sm:order-0">
  <ProductGallery images={data?.images ?? []} />
   </div>



</div>
<div className="mt-10 text-right">
  <h2 className="mb-4 text-xl font-bold text-zinc-900">
    معرفی محصول
  </h2>

  <p className="mb-8 leading-8 text-zinc-600">
    {data?.description}
  </p>

  <h2 className="mb-4 text-xl font-bold text-zinc-900">
    ویژگی‌های محصول
  </h2>

  <p className="mb-3 text-zinc-700">
    وزن: {data?.weight}
  </p>

  <p className="text-zinc-700">
    عرض: {data?.dimensions?.width} - ارتفاع:{" "}
    {data?.dimensions?.height} - عمق:{" "}
    {data?.dimensions?.depth}
  </p>
</div>



<Reviewsection/>

</div>

</>


   
)

}