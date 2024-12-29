/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode: false,
    images: {
      domains: [
        "travelie-images.s3.ap-south-1.amazonaws.com",
      ],
    },
    async headers() {
      return [
        {
          // Match all API routes
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "https://www.travelie.life" }, // Frontend domain
            { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
            {
              key: "Access-Control-Allow-Headers",
              value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
            },
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-Frame-Options", value: "DENY" }, // Prevent clickjacking.
            { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }, // Enforce HTTPS.
            { key: "Referrer-Policy", value: "no-referrer-when-downgrade" }, // Protect sensitive referrer data.
            { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" }, // Restrict permissions.
          ],
        },
      ];
    },
  
  experimental: {
    serverActions: {
      allowedOrigins: ['travelie.life', "https://www.travelie.life", 'test.payu.in', "https://travelie.onrender.com"],
    },
  },
};

export default nextConfig;
