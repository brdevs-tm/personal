/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Statik faylga aylantirish
  images: {
    unoptimized: true, // next/image optimizatsiyasini o‘chirish
  },
};

export default nextConfig;
