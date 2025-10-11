"use client"
import Link from "next/link";
import Image from "next/image";
import AboutUsSection from "@/components/About";
import TrustedBySection from "@/components/logoCloud";
import FAQSection from "@/components/Faq";
import Footer from "@/components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Autoplay } from "swiper/modules";

export default function Home() {
  return (
  <>
   <section className="bg-white">
  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    {/* Text Content */}
    <div className="mr-auto place-self-center lg:col-span-7 mb-8 lg:mb-0 text-center lg:text-left">
      <h1 className="max-w-2xl mb-4 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight text-gray-900">
        GET YOUR PRODUCT WITH <span className="text-blue-700">50–70%</span> OFF
      </h1>

      <p className="max-w-2xl mb-6 font-medium text-gray-700 lg:mb-8 text-base sm:text-lg lg:text-xl">
        "Shop the latest collections at unbeatable prices! Discover trendy
        apparel, footwear, and accessories from top brands—all designed to keep
        you stylish without breaking the bank. Hurry, these exclusive deals are
        available for a limited time only!"
      </p>

      <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start sm:space-x-4 space-y-3 sm:space-y-0">
        <Link
          href="/products"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors duration-200"
        >
          View Products
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-center text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50 focus:ring-4 focus:ring-blue-200 transition-colors duration-200"
        >
          Contact Us
        </Link>
      </div>
    </div>

    {/* Responsive Image Slider */}
    <div className="lg:col-span-5 flex justify-center mt-10 lg:mt-0">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-auto relative rounded-lg overflow-hidden"
        >
          <SwiperSlide>
            <Image
              src="/one.jpg"
              width={500}
              height={500}
              alt="Red Nike Sneaker"
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/img2.png"
              width={500}
              height={500}
              alt="Blue Adidas Sneaker"
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/img3.jpg"
              width={500}
              height={500}
              alt="Stylish Jacket"
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/img4.jpg"
              width={500}
              height={500}
              alt="Trendy Sunglasses"
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/img5.jpg"
              width={500}
              height={500}
              alt="Classic Watch"
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>

  {/* Pagination Dots Styling */}
  <style jsx global>{`
    .swiper-pagination {
      position: absolute !important;
      bottom: 12px !important;
      left: 0;
      right: 0;
      text-align: center;
      z-index: 10;
    }
    .swiper-pagination-bullet {
      background: rgba(255, 255, 255, 0.8) !important;
      opacity: 0.7;
      width: 8px !important;
      height: 8px !important;
      margin: 0 4px !important;
    }
    .swiper-pagination-bullet-active {
      background: #ffffff !important;
      opacity: 1;
      transform: scale(1.2);
    }
    @media (max-width: 640px) {
      .swiper-pagination-bullet {
        width: 6px !important;
        height: 6px !important;
        margin: 0 3px !important;
      }
    }
  `}</style>
</section>

{/*trusted by section*/}

 
   {/* About us code */}
   <TrustedBySection/>
   <AboutUsSection/>
   <FAQSection/>
<Footer/>
    </>
  );
}
