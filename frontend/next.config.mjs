/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode: false,
    images: {
      domains: [
        "travelie-images.s3.ap-south-1.amazonaws.com",
      ],
    },
    // async headers() {
    //   return [
    //       {
    //           // matching all API routes
    //           source: "/api/:path*",
    //           headers: [
    //               { key: "Access-Control-Allow-Credentials", value: "true" },
    //               { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
    //               { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
    //               { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
    //           ]
    //       }
    //   ]
  // }
  experimental: {
    serverActions: {
      allowedOrigins: ['travelie.life', '*.travelie.life', 'test.payu.in'],
    },
  },
};

export default nextConfig;
