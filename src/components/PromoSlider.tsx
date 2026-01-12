import { useEffect, useRef, useState, type JSX } from "react"
import { usePromoSlider } from "../services/usePromoSlider"
import Skeleton from "./Skeleton";

const PromoSlider = ():JSX.Element =>{
    const{data} = usePromoSlider()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const promos = data || [];
  
  // Auto scroll
  useEffect(() => {
    if (!isHovered && promos.length > 0 && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / promos.length;
      
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          
          // Reset ke awal jika sudah sampai akhir
          if (next >= promos.length) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
            return 0;
          }
          
          // Scroll ke card berikutnya
          container.scrollTo({
            left: cardWidth * next,
            behavior: 'smooth'
          });
          
          return next;
        });
      }, 2000); // 3.5 detik

      return () => clearInterval(interval);
    }
  }, [isHovered, promos.length]);

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.scrollWidth / promos.length;
      
      container.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
      
      setCurrentIndex(index);
    }
  };

  return (
    <>
    <section className="flex flex-col gap-4 md:gap-6">
     
      <h1 className="text-base md:text-lg text-gray-900 font-semibold">
        Temukan promo menarik
      </h1>

<div className="relative">
        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-hidden scroll-smooth"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          >
          {data? promos.map((promo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] md:w-[340px] lg:w-[360px] group cursor-pointer"
              onClick={() => scrollToCard(index)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 ease-out group-hover:-translate-y-1">
                <img
                  src={promo.banner_image}
                  alt={promo.banner_name}
                  className="w-full h-27.5 md:h-37.5 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Gradient Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          )): 
          <Skeleton/>
          }
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {promos.map((_, index) => (
            <button
            key={index}
              onClick={() => scrollToCard(index)}
              className={`rounded-full transition-all duration-500 ease-out ${
                currentIndex === index
                  ? 'w-8 h-2 bg-red-500'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              />
            ))}
        </div>
      </div>
              </section>
    </>

    )
}

export default PromoSlider;