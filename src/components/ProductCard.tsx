import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  animate?: boolean; // флаг анимации появления
  animationDelay?: number; // задержка анимации (мс)
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  image,
  reverse = false,
  animate = false,
  animationDelay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(!animate);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setIsVisible(true), animationDelay);
      return () => clearTimeout(timer);
    }
  }, [animate, animationDelay]);

  // Обработчики для мобилки: при тапе создаём эффект поднятия
  const handleTouchStart = () => setIsPressed(true);
  const handleTouchEnd = () => setIsPressed(false);
  const handleTouchCancel = () => setIsPressed(false);

  const imageWrapperClasses = reverse
    ? "w-24 sm:w-32 md:w-40 lg:w-56 xl:w-64 shrink-0 min-h-[120px] sm:min-h-0 rounded-r-2xl overflow-hidden"
    : "w-24 sm:w-32 md:w-40 lg:w-56 xl:w-64 shrink-0 min-h-[120px] sm:min-h-0 rounded-l-2xl overflow-hidden";

  return (
    <div
      className={`flex flex-row ${reverse ? "flex-row-reverse" : ""} 
        w-[90%] max-w-screen-xl bg-[#151617] rounded-2xl overflow-hidden shadow-lg 
        min-h-[160px] h-auto 
        transition-transform transition-shadow duration-300 ease-out 
        hover:-translate-y-1 hover:scale-[1.015] hover:shadow-xl

        transform transition-opacity duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}

        ${isPressed ? "scale-[1.02] shadow-xl" : ""}
      `}
      style={{
        willChange: "opacity, transform",
        transitionDelay: `${animationDelay}ms`,
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <div className={imageWrapperClasses}>
        <img
          src={`/${image}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center px-4 sm:px-6 md:px-8 py-4 grow text-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
          {title}
        </h2>
        <p className="text-gray-400 mt-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed">
          {description}
        </p>
        <Link to={`/product/${id}`}>
          <button className="mt-4 px-4 py-1.5 text-sm sm:px-6 sm:py-2.5 sm:text-lg lg:px-7 lg:py-3 lg:text-xl bg-[#2c2d30] rounded-full border border-[#2c2d30] hover:bg-[#3a3b3e] transition-colors text-white font-medium w-fit">
            Подробнее
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
