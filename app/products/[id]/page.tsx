"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}


export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/products/api/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();

        setProduct(data.product);
        setRelated(data.related || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleProductClick = (id: string) => {
    router.push(`/products/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-300 rounded-full animate-spin animation-delay-75"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <></>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Detail Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Product Image */}
            <div className="relative group">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  src={product.image}
                  alt={product.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center space-y-6 lg:pl-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 uppercase tracking-wider">
                  {product.category}
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                  ₹{(product.price * 1.2).toFixed(2)}

                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
                  {product.description}
                </p>
              </div>

              {/* Product Features/Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">4.8</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">2.1k</div>
                  <div className="text-sm text-gray-600">Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              You Might Also Like
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover more products that complement your style and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
  {related.map((product) => (
    <div
      key={product._id} // ✅ use _id instead of id
      className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
      onClick={() => handleProductClick(product._id)}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          src={product.image}
          alt={product.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
          <span className="text-sm font-bold text-gray-900">
            ₹{product.price}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-400 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-2">(4.8)</span>
          </div>

          <div className="text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
      </section>
    </div>
  );
}