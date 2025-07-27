import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";

function transliterate(text: string): string {
  const ruToEnMap: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };
  return text
    .toLowerCase()
    .split("")
    .map((char) => ruToEnMap[char] || char)
    .join("");
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const normalizedSearch = searchTerm.toLowerCase();
  const transliteratedSearch = transliterate(normalizedSearch);

  const filteredProducts = products.filter((product) => {
    const title = product.title.toLowerCase();
    const description = product.description.toLowerCase();

    const titleTranslit = transliterate(title);
    const descriptionTranslit = transliterate(description);

    return (
      title.includes(normalizedSearch) ||
      description.includes(normalizedSearch) ||
      titleTranslit.includes(transliteratedSearch) ||
      descriptionTranslit.includes(transliteratedSearch)
    );
  });

  return (
    <div className="min-h-screen bg-[#0f0f10] flex flex-col items-center justify-start p-4 text-white space-y-6">
      {/* Поисковик */}
      <div className="relative w-full max-w-screen-md">
        <input
          type="text"
          placeholder="Поиск по товарам..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg text-black focus:outline-none border border-gray-400 bg-gray-100"
        />
        <svg
          className="w-5 h-5 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
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

      {/* Карточки */}
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            image={product.image}
            reverse={product.reverse}
          />
        ))
      ) : (
        <p className="text-white mt-10">По вашему запросу ничего не найдено.</p>
      )}
    </div>
  );
}

export default Home;
