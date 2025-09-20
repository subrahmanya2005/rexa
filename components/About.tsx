import React from "react";
import Image from "next/image";

const AboutUsSection: React.FC = () => {
  return (
    <section className="relative bg-white py-16 px-6">
      {/* Content Container */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">About Us</h2>
          <p className="text-gray-700 mb-6 text-lg">
            We are a local men’s e-commerce shop dedicated to offering stylish,
            affordable, and high-quality apparel for every occasion. From
            everyday essentials to premium fashion pieces, our goal is to bring
            modern trends and timeless classics right to your doorstep — helping
            you look confident and feel your best without breaking the bank.
          </p>

          <div className="space-y-6">
  {/* Card 1 (Brands) */}
  <div className="flex items-center space-x-4 p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-300">
    <div className="p-3 bg-white rounded-full shadow-md">
      {/* Shopping bag icon for Brands */}
      <svg
        className="w-6 h-6 text-blue-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M6 7V6a6 6 0 1112 0v1h2a1 1 0 011 1v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h2zm2 0h8V6a4 4 0 10-8 0v1z" />
      </svg>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-blue-900">Top Brands</h3>
      <p className="text-gray-600 text-sm">
        Explore a wide range of trusted names like Nike, Adidas, Levi’s, Puma,
        and more — bringing you the best in men’s fashion.
      </p>
    </div>
  </div>

  {/* Card 2 (Trendy & Affordable) */}
  <div className="flex items-center space-x-4 p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-300">
    <div className="p-3 bg-white rounded-full shadow-md">
      {/* Tag/discount icon for affordability */}
      <svg
        className="w-6 h-6 text-yellow-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.59 13.41L11.17 4H4v7.17l9.41 9.42a2 2 0 002.83 0l4.35-4.35a2 2 0 000-2.83zM6 9a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-blue-900">Trendy & Affordable</h3>
      <p className="text-gray-600 text-sm">
        We blend the latest fashion with affordability, making it easy for every
        man to stay stylish without overspending.
      </p>
    </div>
  </div>

  {/* Card 3 (Variety of Collection) */}
  <div className="flex items-center space-x-4 p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-300">
    <div className="p-3 bg-white rounded-full shadow-md">
      {/* Collection/grid icon for variety */}
      <svg
        className="w-6 h-6 text-green-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M4 5h4v4H4V5zm6 0h4v4h-4V5zm6 0h4v4h-4V5zM4 11h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 17h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
      </svg>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-blue-900">Variety of Collection</h3>
      <p className="text-gray-600 text-sm">
        From shoes and clothing to fragrances and accessories, Rexa offers a
        complete collection to match every style and occasion.
      </p>
    </div>
  </div>
</div>

        </div>

        {/* Image Section */}
        <div className="relative p-4">
          <Image
            src="/about.jpg"
            alt="About Us"
            width={800}
            height={600}
            className="rounded-xl shadow-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
