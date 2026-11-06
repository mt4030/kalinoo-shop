import { useParams } from 'react-router-dom'
import { useProductReviews } from '../hooks/useProductReviews';

export default function Reviewsection(){

const { id } = useParams();
const productId = Number(id);

const { data, isPending, isError} =useProductReviews(productId);


  if (isPending) return <p>Loading reviews...</p>;

  if (isError) return <p>Something went wrong.</p>;

if (!data || data.length === 0) {
    console.log('هنوز نظری برای این محصول ثبت نشده است.')
  return <p>هنوز نظری برای این محصول ثبت نشده است.</p>;
}
return(
    <>
    <div className="mt-12 mb-5 border-t border-zinc-200 pt-10 text-right">
  <h2 className="mb-6 text-xl font-bold text-zinc-900">
    نظرات خریداران
  </h2>

  <div className="space-y-4 flex flex-col items-center  ">
    {data.map((review) => (
      <div
        key={`${review.reviewer_name}-${review.created_at}`}
        className="w-full max-w-2xl rounded-[12px] bg-zinc-100 p-5  "
      >
        <div className=" flex flex-col  mb-3  items-end justify-between gap-4">
          <div className='flex gap-5 justify-center'>
               <p className="mt-1 text-xs text-zinc-400 flex justify-center align-middle">
              {new Date(review.created_at).toLocaleDateString("fa-IR")}
            </p>
            <h3 className="font-bold text-zinc-900">
              {review.reviewer_name}
            </h3>

         
          </div>

          <div className="flex items-center text-xl font-bold gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={
                  index < review.rating
                    ? "text-yellow-400"
                    : "text-zinc-300"
                }
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <p className="leading-7 text-zinc-600">
          {review.comment}
        </p>
      </div>
    ))}
  </div>
</div>

    </>
)

}
