"use client";

import Image from "next/image";

const logos = [
  "/levis.png",
  "/nike.png",
  "/adidas.png",
  "/reebok.png",
  "/crocs.png",
  "/louis-philippe.png",
  "/UA_BIG.png"
];

const TrustedBySection = () => {
  return (
    <section className="bg-white py-16 px-6 overflow-hidden">
      <div className="text-xl md:text-2xl font-semibold text-center text-gray-700 mb-10">
        Trusted by <span className="text-indigo-600 font-bold">2000+</span> customers worldwide
      </div>

      <div className="flex animate-marquee gap-20 whitespace-nowrap">
        {logos.concat(logos).map((logo, index) => (
          <div key={index} className="flex-shrink-0 px-6">
            <Image
              src={logo}
              alt={`Logo ${index + 1}`}
              width={140} // wider so logos don't squash
              height={60}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-flex;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default TrustedBySection;
