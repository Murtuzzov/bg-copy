import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../types";

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
    return <div className="text-white p-4">Загрузка...</div>;
  }

  if (error) {
    return (
      <div className="text-white p-4">
        Ошибка: {error}
        <br />
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Назад на главную
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-white p-4">
        Продукт не найден.
        <br />
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
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

          <button
            onClick={() => navigate("/")}
            className="self-start text-white border border-white rounded-full px-5 py-2 hover:bg-white hover:text-black transition-colors"
          >
            ← Назад
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
