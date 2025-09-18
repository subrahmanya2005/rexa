// components/Footer.tsx
import Link from "next/link";
import React from "react";
import { Phone, MessageCircle, Instagram, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const handlePhoneClick = () => {
    window.location.href = "tel:+919876543210"; // Replace with actual number
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "919876543210"; // Replace with actual number
    const message = "Hello! I'm interested in your products.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInstagramClick = () => {
    const instagramUrl = "https://www.instagram.com/rexa_footwear/"; // Replace with actual handle
    window.open(instagramUrl, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:info@rexa.com"; // Replace with actual email
  };

  return (
    <footer className="w-full bg-gray-100 mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto">
          {/* Logo + Description + Contact */}
          <div className="col-span-full mb-6 lg:col-span-2 lg:mb-0">
            <Link href="/" className="flex justify-center lg:justify-start">
              <div className="text-2xl font-bold text-gray-900">REXA</div>
            </Link>
            <p className="py-4 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">
              Quality footwear and fashion for every occasion. Trusted by 2000+ customers across India.
            </p>
            <Link
              href="/contact"
              className="py-2.5 px-5 h-9 inline-block bg-indigo-600 rounded-full shadow-sm text-xs text-white mx-auto transition-all duration-500 hover:bg-indigo-700 lg:mx-0"
            >
              Contact us
            </Link>
          </div>

          {/* Home Links */}
          <div className="lg:mx-auto text-center sm:text-left">
            <Link href="/" className="text-lg text-gray-900 font-medium hover:text-indigo-600 transition-all">
              Home
            </Link>
          </div>

          {/* Products Links */}
          <div className="lg:mx-auto text-center sm:text-left">
            <Link href="/products" className="text-lg text-gray-900 font-medium hover:text-indigo-600 transition-all">
              Products
            </Link>
          </div>

          {/* Testimonials */}
          <div className="lg:mx-auto text-center sm:text-left">
            <Link href="/testimonials" className="text-lg text-gray-900 font-medium hover:text-indigo-600 transition-all">
              Testimonials
            </Link>
          </div>

          {/* Contact Links */}
          <div className="lg:mx-auto text-center sm:text-left">
            <Link href="/contact" className="text-lg text-gray-900 font-medium hover:text-indigo-600 transition-all">
              Contact
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-7 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between">
            <span className="text-sm text-gray-500 mb-4 lg:mb-0">
              © REXA 2025, All rights reserved.
            </span>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {/* Phone */}
              <button
                onClick={handlePhoneClick}
                className="w-9 h-9 rounded-full bg-blue-600 flex justify-center items-center hover:bg-blue-700 transition-all duration-300"
                title="Call us"
                aria-label="Call us"
              >
                <Phone className="w-4 h-4 text-white" />
              </button>

              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppClick}
                className="w-9 h-9 rounded-full bg-green-500 flex justify-center items-center hover:bg-green-600 transition-all duration-300"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-white" />
              </button>

              {/* Instagram */}
              <button
                onClick={handleInstagramClick}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 flex justify-center items-center transition-all duration-300"
                title="Follow us on Instagram"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
              </button>

              {/* Email */}
              <button
                onClick={handleEmailClick}
                className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-gray-800 transition-all duration-300"
                title="Email us"
                aria-label="Email us"
              >
                <Mail className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;