import React from "react"
import { Link } from "react-router-dom"
// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react"
// import swiper styles
import "swiper/css"
import "swiper/css/effect-fade"
// import required modules
import { EffectFade, Autoplay } from "swiper/modules"
// images
import Img1 from "../assets/hero/1.png"
import Img2 from "../assets/hero/2.png"
import Img3 from "../assets/hero/3.png"

const slides = [
  {
    title: "Yallambee on Bolong",
    bg: Img1,
    btnText: "See our tiny homes",
  },
  {
    title: "Yallambee on Bolong",
    bg: Img2,
    btnText: "See our tiny homes",
  },
  {
    title: "Yallambee on Bolong",
    bg: Img3,
    btnText: "See our tiny homes",
  },
]

const HeroSlider = () => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={"fade"}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="heroSlider h-[600px] lg:h-[860px]"
    >
      {slides.map((slide, index) => {
        // destructure slide
        const { title, bg, btnText } = slide
        return (
          <SwiperSlide
            className="h-full relative flex justify-center items-center"
            key={index}
          >
            <div className="z-20 text-white text-center">
              <div className="uppercase font-tertiary tracking-[6px] mb-5">
                Switch Off and Unwind
              </div>
              <h1 className="text-[32px] font-primary uppercase tracking-[2px] max-w-[920px] lg:text-[68px] leading-tight mb-6">
                {title}
              </h1>
              <Link to="/#property-listing">
                <button className="btn btn-lg btn-primary mx-auto">
                  {btnText}
                </button>
              </Link>
            </div>
            <div className="absolute top-0 w-full h-full">
              <img className="object-cover h-full w-full" src={bg} alt="" />
            </div>
            {/* overlay */}
            <div className="absolute w-full h-full bg-black/70"></div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default HeroSlider