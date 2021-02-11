const withCSS = require("@zeit/next-css")
const withPurgeCss = require("next-purgecss")
const withFonts = require("next-fonts")
const withBabelMinify = require("next-babel-minify")({
  comments: false,
})

module.exports = withBabelMinify({
  webpack(config, options) {
    return config
  },
})

module.exports = withCSS(
  {
    env: {
      API_URL: process.env.API_URL,
    },
  },
  withPurgeCss({
    purgeCssPaths: [
      "pages/**/*",
      "components/**/*", // also scan other-components folder
    ],
  })
)

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))

    // Important: return the modified config
    return config
  },
}

module.exports = {
  images: {
    domains: ["restcountries.eu"],
  },
}
