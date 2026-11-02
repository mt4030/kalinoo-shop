type CategoryBannerProps = {
  image: string
  title: string
}

const CategoryBanner = ({ image, title }: CategoryBannerProps) => {
  return (
    <div className="relative mt-1 overflow-hidden  rounded-xl">
      <img
        src={image}
        alt={title}
        className="sm:h-full sm:w-full h-90 object-cover"
      />


      
    </div>
  )
}

export default CategoryBanner