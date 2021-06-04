export default {
  target: "server",
  head: {
    title: "Ludis",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Application to find board game players around you.",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap",
      },
    ],
  },
  css: ["~/assets/styles/main"],
  styleResources: {
    scss: ["assets/styles/main.scss"],
  },
  build: {
    loaders: {
      scss: { sourceMap: false },
    },
  },
  plugins: ["~/plugins/axios.js", "~/plugins/route-link.js", "~/plugins/directives.client.js"],
  components: true,
  buildModules: ["@nuxtjs/dotenv", "@nuxtjs/pwa"],
  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "@nuxtjs/style-resources"],
  env: {
    mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
  },
  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
  },
  pwa: {
    meta: {
      name: "Ludis",
      lang: "fr",
    },
    manifest: {
      name: "Ludis",
      shortName: "Ludis",
      lang: "fr",
    },
  },
};
