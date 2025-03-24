import { useState } from "react";
import { ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";

const allProducts = [
  {
    category: "Watch",
    name: "Orange Watch 12 High Quality Health Sensor",
    price: "$959.99",
    oldPrice: "$1,919.99",
    discount: 50,
    image: "watch.png",
    rating: 5,
    reviews: 120,
  },
  {
    category: "Tablet",
    name: "Ultra Tablet Qwerty HD 10765 Series Low Price",
    price: "$799.00",
    image: "tablet.png",
    rating: 4,
    reviews: 100,
  },
  {
    category: "Audio",
    name: "QuietComfort 45 Wireless Headphone",
    price: "$329.99",
    image: "headphone.png",
    rating: 5,
    reviews: 120,
  },
  {
    category: "Laptop",
    name: "Surface Laptop 4 XPS 13 Plus 64GB i7 Touch",
    price: "$2,399.99",
    oldPrice: "$2,879.00",
    discount: 20,
    image: "laptop.png",
    rating: 5,
    reviews: 120,
  },
  {
    category: "Camera",
    name: "CamPro HERO10 Black Sleek Design 2023 4K",
    price: "$1,499.99",
    image: "camera.png",
    rating: 5,
    reviews: 20,
  },
  {
    category: "Smartphone",
    name: "Galaxy Ultra S30 Pro Max 512GB 5G",
    price: "$1,199.99",
    oldPrice: "$1,499.99",
    discount: 20,
    image: "smartphone.png",
    rating: 5,
    reviews: 250,
  },
  {
    category: "Gaming",
    name: "XtremeForce RTX 4090 Gaming PC 64GB RAM",
    price: "$3,499.99",
    image: "gaming-pc.png",
    rating: 5,
    reviews: 80,
  },
  {
    category: "Smart Home",
    name: "Echo Home AI Assistant with Smart Hub",
    price: "$249.99",
    image: "smart-home.png",
    rating: 4,
    reviews: 150,
  },
  {
    category: "Drone",
    name: "Phantom Pro 5 Drone 8K UHD with GPS",
    price: "$2,299.99",
    oldPrice: "$2,799.99",
    discount: 18,
    image: "drone.png",
    rating: 5,
    reviews: 90,
  },
];

export default function NovosProdutos() {
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + visibleProducts < allProducts.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleLoadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, allProducts.length));
  };

  return (
    <section className="py-10 px-4 sm:px-10 lg:px-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-black-700">Novos Produtos</h2>

      <div className="relative flex items-center">
        {/* Botão Esquerda */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`absolute left-0 z-10 p-2 bg-blue-100 rounded-full shadow ${
            startIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-200"
          }`}
        >
          <ChevronLeft size={24} className="text-blue-700" />
        </button>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mx-auto">
          {allProducts.slice(startIndex, startIndex + visibleProducts).map((product, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition relative"
            >
              {product.discount && (
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}%
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-contain mb-4"
              />
              <p className="text-xs text-gray-500 uppercase">{product.category}</p>
              <h3 className="text-sm font-semibold line-clamp-2 text-blue-700">{product.name}</h3>
              <div className="flex items-center my-2">
                <span className="text-lg font-bold text-blue-600">{product.price}</span>
                {product.oldPrice && (
                  <span className="text-xs text-gray-400 line-through ml-2">
                    {product.oldPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-yellow-500 text-sm">
                {Array.from({ length: product.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
                <span className="text-gray-500 text-xs">({product.reviews})</span>
              </div>
              <div className="flex space-x-3 mt-3">
                <button className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
                  <ShoppingCart size={16} />
                </button>
                <button className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
                  <Heart size={16} />
                </button>
                <button className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Direita */}
        <button
          onClick={handleNext}
          disabled={startIndex + visibleProducts >= allProducts.length}
          className={`absolute right-0 z-10 p-2 bg-blue-100 rounded-full shadow ${
            startIndex + visibleProducts >= allProducts.length
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-200"
          }`}
        >
          <ChevronRight size={24} className="text-blue-700" />
        </button>
      </div>

      {/* Botão Carregar Mais */}
      {visibleProducts < allProducts.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Carregar Mais
          </button>
        </div>
      )}
    </section>
  );
}
