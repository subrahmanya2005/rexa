"use client"
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import AboutUsSection from "@/components/About";
import TrustedBySection from "@/components/logoCloud";
import FAQSection from "@/components/Faq";
import Footer from "@/components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper/modules";


export default function Home() {
  return (
  <>
    <section className="bg-white">
      <div className="grid max-w-screen-xl px-4 py-16 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
        {/* Text Content */}
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl xl:text-6xl">
            GET YOUR PRODUCT WITH <span className="text-blue-700">50-70%</span>{" "}
            OFF
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-700 lg:mb-8 md:text-lg lg:text-xl font-semibold text-2xl">
            “Shop the latest collections at unbeatable prices! Discover trendy
            apparel, footwear, and accessories from top brands—all designed to
            keep you stylish without breaking the bank. Hurry, these exclusive
            deals are available for a limited time only!”
          </p>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <Link
              href={"/products"}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
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
              href={"/contact"}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-center text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50 focus:ring-4 focus:ring-blue-200"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Responsive Image Slider */}
        <div className="mt-8 lg:mt-0 lg:col-span-5 flex justify-center">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="w-full max-w-sm lg:max-w-full relative"
          >
            <SwiperSlide>
              <div className="relative">
                <Image
                  src="/one.jpg"
                  width={500}
                  height={500}
                  alt="Red Nike Sneaker"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative">
                <Image
                  src="/img2.png"
                  width={500}
                  height={500}
                  alt="Blue Adidas Sneaker"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative">
                <Image
                  src="/img3.jpg"
                  width={500}
                  height={500}
                  alt="Stylish Jacket"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative">
                <Image
                  src="/img4.jpg"
                  width={500}
                  height={500}
                  alt="Trendy Sunglasses"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative">
                <Image
                  src="/img5.jpg"
                  width={500}
                  height={500}
                  alt="Classic Watch"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      {/* Style pagination dots */}
      <style jsx global>{`
        .swiper-pagination {
          position: absolute !important;
          bottom: 12px !important; /* inside the image */
          left: 0;
          right: 0;
          text-align: center;
        }
        .swiper-pagination-bullet {
          background: #2563eb; /* Tailwind blue-600 */
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background: #1d4ed8; /* Tailwind blue-700 */
          opacity: 1;
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
