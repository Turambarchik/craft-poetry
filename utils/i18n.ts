import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../public/locales/en/common.json";
import enTable from "../public/locales/en/table.json";
import enValidation from "../public/locales/en/validation.json";
import ruCommon from "../public/locales/ru/common.json";
import ruTable from "../public/locales/ru/table.json";
import ruValidation from "../public/locales/ru/validation.json";
import ukrCommon from "../public/locales/ukr/common.json";
import ukrTable from "../public/locales/ukr/table.json";
import ukrValidation from "../public/locales/ukr/validation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      table: enTable,
      validation: enValidation,
    },
    ru: {
      common: ruCommon,
      table: ruTable,
      validation: ruValidation,
    },
    ukr: {
      common: ukrCommon,
      table: ukrTable,
      validation: ukrValidation,
    },
  },
  lng: "en",

  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
