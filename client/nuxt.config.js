export default {
  target: "server",
  head: {
    title: "AA App",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Application to find board game players around you.",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  css: ["~/assets/styles/main"],
  plugins: ["~/plugins/axios.js", "~/plugins/route-link.js", "~/plugins/user.js"],
  components: true,
  buildModules: ["@nuxtjs/dotenv", "@nuxtjs/tailwindcss"],
  modules: ["@nuxtjs/axios", "@nuxtjs/pwa"],
  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
  },
};
