/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [{ hostname: "*.public.blob.vercel-storage.com" }],
  },
};

export default nextConfig;
