
import CartQuantityControl from "@/features/cart/components/CartQuantityControl";
import { useCartStore } from "@/features/cart/store/cartStore";
import MobileProductPurchaseBar from "@/features/products/components/MobileProductPurchaseBar";
import ProductGallery from "@/features/products/components/ProductGallery";
import ProductTopBar from "@/features/products/components/ProductTop";
import { useProduct } from "@/features/products/hooks/useProduct";
import Reviewsection from "@/features/reviews/components/ReviewSection";
import { useParams } from "react-router-dom"


export default function ProductPage(){

const {id}=useParams()
  const productId = Number(id);
const{data, isPending, isError, error}=useProduct(productId)
const addItem = useCartStore((state) => state.addItem);
const finalPrice =
  Number(data?.price) *
  (1 - Number(data?.discount_percentage) / 100);const cartItem = useCartStore((state) =>
  state.items.find((item) => item.productId === productId)
);
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
<MobileProductPurchaseBar
  data={data}
  finalPrice={finalPrice}
  cartItem={cartItem}
  productId={productId}
  addItem={addItem}
/>
<div className=" flex flex-col sm:flex-row
  gap-8 rounded-[12px] text-right mt-10  border-zinc-200 bg-white p-6">
{/* Purchase / stock information */}

  <div className=" rounded-[12px] hidden sm:flex  w-full z-50 bottom-0  left-0 right-0 sm:static sm:w-64 flex-col align-end   border border-zinc-200 p-5">
    
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
      <div className="flex flex-col gap-2">
  <div className="flex items-center gap-2">
    <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-600">
      {data.discount_percentage}% تخفیف
    </span>

    <span className="text-sm text-zinc-400 line-through">
      {data.price.toLocaleString()}
    </span>
  </div>

  <div className="flex items-baseline gap-1">
    <span className="text-xl font-extrabold tracking-tight text-zinc-900">
      {Number(finalPrice).toLocaleString()}
    </span>
    <span className="text-xs font-medium text-zinc-500">
      تومان
    </span>
  </div>
</div>

    {cartItem ? (
  <CartQuantityControl
    productId={productId}
    quantity={cartItem.quantity}
  />
) : (
  <button
    type="button"
    onClick={() => addItem(data)}
    className="w-full rounded-[12px] bg-[#2457D6] py-3 font-bold text-white transition hover:bg-[#173B8F]"
  >
    افزودن به سبد خرید
  </button>
)}
    </div>
    
  </div>
  {/* Product information */}
  <div className="order-2 flex flex-1 flex-col justify-start pt-3 sm:order-0">
    <div className="mb-3 text-sm font-medium text-[#172554]">
      {data?.brand}
    </div>

    <div className="mb-5 text-2xl font-bold text-zinc-900">
      {data?.title}
    </div>

    <div className="  pb-5 ">
      
      <span className="  px-3 py-1 text-sm font-bold text-gray-700 ml-5"> امتیاز خریداران</span>
      <span className="rounded-[12px] bg-yellow-50 px-3 py-1 text-sm font-bold text-yellow-700">
     {data?.rating} از5
      </span>

      
    </div>
  </div>

  
   {/* Product gallery */}
   <div className="order-1 sm:order-0 ">
  <ProductGallery images={data?.images ?? []} />
   </div>



</div>
<div className="mt-10 space-y-8 text-right">

  {/* معرفی محصول */}
  <section>
    <h2 className="mb-3 text-lg font-bold text-zinc-900">
      معرفی محصول
    </h2>

    <p className="text-sm leading-8 text-zinc-600">
      {data?.description}
    </p>
  </section>

  {/* ویژگی‌های محصول */}
  <section>
    <h2 className="mb-4 text-lg font-bold text-zinc-900">
      ویژگی‌های محصول
    </h2>

    <div className="grid grid-cols-3 gap-3">

      {/* وزن - کارت بزرگ */}
      <div className="col-span-3 rounded-xl bg-zinc-100 p-4">
        <span className="mb-2 block text-xs font-medium text-zinc-500">
          وزن محصول
        </span>

        <span className="text-base font-bold text-zinc-800">
          {data?.weight}
        </span>
      </div>

      {/* ابعاد */}
      <div className="rounded-xl bg-zinc-100 p-3">
        <span className="mb-2 block text-xs text-zinc-500">
          عرض
        </span>
        <span className="text-sm font-bold text-zinc-800">
          {data?.dimensions?.width}
        </span>
      </div>

      <div className="rounded-xl bg-zinc-100 p-3">
        <span className="mb-2 block text-xs text-zinc-500">
          ارتفاع
        </span>
        <span className="text-sm font-bold text-zinc-800">
          {data?.dimensions?.height}
        </span>
      </div>

      <div className="rounded-xl bg-zinc-100 p-3">
        <span className="mb-2 block text-xs text-zinc-500">
          عمق
        </span>
        <span className="text-sm font-bold text-zinc-800">
          {data?.dimensions?.depth}
        </span>
      </div>

    </div>
  </section>
</div>



<Reviewsection/>

</div>

</>


   
)

}