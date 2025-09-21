// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // ✅ allow Cloudinary images
    formats: ["image/avif", "image/webp"], // optional but recommended
  },
};

module.exports = nextConfig;
