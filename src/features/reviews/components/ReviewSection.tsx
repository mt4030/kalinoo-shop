import { useParams } from 'react-router-dom'
import { useProductReviews } from '../hooks/useProductReviews';

export default function Reviewsection(){

const { id } = useParams();
const productId = Number(id);

const { data, isPending, isError} =useProductReviews(productId);
console.log("Product ID:", productId);
console.log("Reviews:", data);

  if (isPending) return <p>Loading reviews...</p>;

  if (isError) return <p>Something went wrong.</p>;

if (!data || data.length === 0) {
    console.log('هنوز نظری برای این محصول ثبت نشده است.')
  return <p>هنوز نظری برای این محصول ثبت نشده است.</p>;
}
return(
    <>
    <div className="mt-12 border-t border-zinc-200 pt-10 text-right">
  <h2 className="mb-6 text-xl font-bold text-zinc-900">
    نظرات کاربران
  </h2>

  <div className="space-y-4">
    {data.map((review) => (
      <div
        key={`${review.reviewer_name}-${review.created_at}`}
        className="rounded-xl border border-zinc-200 bg-white p-5"
      >
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-zinc-900">
              {review.reviewer_name}
            </h3>

            <p className="mt-1 text-xs text-zinc-400">
              {new Date(review.created_at).toLocaleDateString("fa-IR")}
            </p>
          </div>

          <div className="flex items-center gap-1">
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
