/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    locales: ["en", "ru", "ukr"],
    defaultLocale: "en",
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
