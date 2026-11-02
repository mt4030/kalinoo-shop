import { Link } from "react-router-dom";

const ProductCard=({product})=>{


const finalPrice =  (Number(product.price) * (1 - Number(product.discount_percentage) / 100)).toFixed(2);
    return(
        <Link to={`/product/${product.id}`} className=" flex h-90  w-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      

       
        <div className="flex h-50 items-center justify-center bg-zinc-50 p-4"> 
            <img src={product.thumbnail} className="object-contain h-full w-full" alt={product.title} />
          
        </div>
    

    <div className="flex flex-1 flex-col justify-between p-4">

  <p className=" line-clamp-2 text-base font-medium leading-5 text-zinc-800 ">{product.title}</p>
        <div className="mt-4">
        <div className="flex flex-col   ">

            <div className="flex gap-2 items-center">
              
              
              
              <div className="text-sm text-zinc-400 line-through  ">
    {product.price}
    </div>
            <div className="bg-red-400  text-xs font-semibold text-white rounded-full flex align-middle justify-center p-1  ">{product.discount_percentage}%</div>  
            </div>
            

            <div className="mt-2 flex gap-2 items-start text-2xl font-bold text-zinc-900">
  <span className="text-sm font-medium text-zinc-500">
    تومان
  </span>{" "}
  {finalPrice}
</div>
        </div>
    </div></div>
       
      
        </Link>
    )
}
export default ProductCard
