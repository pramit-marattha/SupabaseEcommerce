module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["ezkjatblqzjynrebjkpq.supabase.co"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
