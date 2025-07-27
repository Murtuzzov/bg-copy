import { useState, useEffect, useRef } from "react";
import type { FC } from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile); // открыт по умолчанию только на десктопе
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Прокрутка при открытии на мобилке
  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-screen-md px-4 mx-auto sticky top-4 z-50`}
    >
      {isMobile && !isOpen ? (
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(true)}
            className="text-white p-2 rounded-full bg-[#1f1f22] hover:bg-[#2a2a2d] transition-colors"
            aria-label="Открыть поиск"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      ) : (
        <div
          className={`relative transition-all duration-500 ease-in-out transform ${
            isOpen || !isMobile
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
          style={{ transformOrigin: "top" }}
        >
          <input
            type="text"
            placeholder="Поиск по товарам..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-white bg-[#1f1f22] rounded-full focus:outline-none placeholder-gray-400 shadow-md"
            autoFocus={isMobile}
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
