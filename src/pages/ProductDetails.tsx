import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../types";
import { FaTelegramPlane, FaInstagram, FaWhatsapp } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Некорректный ID продукта");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Продукт не найден");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f10] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f10] text-white p-4">
        <p className="text-red-400 mb-4">Ошибка: {error}</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Назад на главную
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f10] text-white p-4">
        <p className="mb-4">Продукт не найден.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Назад на главную
        </button>
      </div>
    );
  }

  return (
    <main className="bg-[#0f0f10] text-white min-h-screen w-full">
      <div className="flex flex-col md:flex-row w-full">
        {/* Фото */}
        <div className="w-full md:w-1/2">
          <img
            src={`/${product.image}`}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Контент */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 py-6 md:px-12 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            {product.title}
          </h1>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-base leading-relaxed mb-8">{product.details}</p>

          {/* Связаться с менеджером */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Связаться с менеджером
            </h2>
            <div className="flex space-x-6 text-white text-3xl">
              <a
                href="https://t.me/your_telegram" // замените на реальную ссылку
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="hover:text-[#0088cc] transition-colors"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="https://instagram.com/your_instagram" // замените на реальную ссылку
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-500 transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/your_number" // замените на реальную ссылку
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:text-green-500 transition-colors"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Кнопка Назад слева под связью с менеджером */}
          <div className="w-full flex justify-start mt-8 pb-10">
            <button
              onClick={() => navigate("/")}
              className="text-white border border-white rounded-full px-6 py-2 hover:bg-white hover:text-black transition-colors"
            >
              ← Назад
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
