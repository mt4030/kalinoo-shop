import { Link } from "react-router-dom"

type HeroSlideProps = {
  slide: {
    id: number
    image: string
    link: string
  }
}

export function HeroSlide({ slide }: HeroSlideProps) {
  return (
    <Link to={slide.link} className="block h-full w-full">
      <img
        src={slide.image}
        alt=""
        className="h-full w-full object-cover"
      />
    </Link>
  )
}