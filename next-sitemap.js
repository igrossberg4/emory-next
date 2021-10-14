module.exports = {
  siteUrl: process.env.SITE_URL || "https://example.com",
  changefreq: "weekly",
  outDir: "out/",
  generateRobotsTxt: true, // (optional)
  exclude: ["/styleguide"],
  // ...other options
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/styleguide" },
    ],
  },
};
