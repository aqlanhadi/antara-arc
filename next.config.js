/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "vercel.com"],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/aqlanhadi/antara",
        permanent: false,
      },
    ];
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "robohash.org", 
      "lh3.googleusercontent.com", 
      "vercel.com",
      "platform-lookaside.fbsbx.com",
      "picsum.photos",
      "flowbite.s3.amazonaws.com"
    ],
  }
};

module.exports = nextConfig;
