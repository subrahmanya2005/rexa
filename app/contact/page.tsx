"use client"
import React from "react";
import { Instagram, MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactSection: React.FC = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "9845458637";
    const message = "Hello! I'm interested in your products.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInstagramClick = () => {
    const instagramUsername = "rexa_puttur";
    const instagramUrl = `https://www.instagram.com/${instagramUsername}/`;
    window.open(instagramUrl, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+919845458637";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:mobilecarealthaf@gmail.com";
  };

  return (
    <>
      {/* Location Section */}
      <section className="bg-gray-100 relative">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-20 lg:px-8">
          {/* Header */}
          <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              Visit Our Location
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-500">
              Find us at our store location or connect with us on social media
            </p>
          </div>

          {/* Content */}
          <div className="mt-12 lg:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Google Maps */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.2794730704863!2d75.20315207488925!3d12.76035388753595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4bdd8795d66f5%3A0x7e54db137f52bfa2!2sRexa%20puttur!5e0!3m2!1sen!2sin!4v1759223395094!5m2!1sen!2sin"
                 width="100%"
                  height="450"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full border-0"
                  title="REXA Store Location"
                ></iframe>
              </div>

              {/* Info Box */}
              <div className="bg-white rounded-lg shadow-lg">
                {/* Address */}
                <div className="px-6 py-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Our Address
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                       CITY CENTRE BUILDING OPP GL ONE MALL <br />
                       MAIN ROAD PUTTUR <br />
                       574201
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="border-t border-gray-200 px-6 py-6">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Store Hours</h3>
                      <div className="space-y-1 text-gray-600">
                        <p>Monday - Friday: 10:00 AM - 9:00 PM</p>
                        <p>Saturday: 10:00 AM - 9:00 PM</p>
                        <p>Sunday: 10:00 AM - 9:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="border-t border-gray-200 px-6 py-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Get In Touch
                  </h3>

                  {/* Contact Methods */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <button
                        onClick={handlePhoneClick}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        type="button"
                      >
      +919845458637
                      </button>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <button
                        onClick={handleEmailClick}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        type="button"
                      >
                        mobilecarealthaf@gmail.com
                      </button>
                    </div>
                  </div>

                  {/* Social Media Icons (hidden on mobile, visible only md+) */}
                  <div className="mt-6 hidden md:block">
                    <h4 className="text-md font-medium text-gray-900 mb-3">Connect With Us</h4>
                    <div className="flex space-x-4">
                      <button
                        onClick={handlePhoneClick}
                        className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                        type="button"
                        aria-label="Call us"
                      >
                        <Phone className="w-6 h-6" />
                      </button>
                      <button
                        onClick={handleWhatsAppClick}
                        className="flex items-center justify-center w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                        type="button"
                        aria-label="WhatsApp us"
                      >
                        <MessageCircle className="w-6 h-6" />
                      </button>
                      <button
                        onClick={handleInstagramClick}
                        className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                        type="button"
                        aria-label="Follow us on Instagram"
                      >
                        <Instagram className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Social Media Icons - visible only on mobile */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 md:hidden">
          <button
            onClick={handlePhoneClick}
            className="flex items-center justify-center w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            type="button"
            aria-label="Call us"
          >
            <Phone className="w-7 h-7" />
          </button>
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            type="button"
            aria-label="WhatsApp us"
          >
            <MessageCircle className="w-7 h-7" />
          </button>
          <button
            onClick={handleInstagramClick}
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            type="button"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="w-7 h-7" />
          </button>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
