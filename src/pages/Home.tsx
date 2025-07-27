import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
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
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : filteredProducts.length > 0 ? (
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
