import { TFunction } from "i18next";
import { Language } from "utils/types/globalTypes";

export const transformLangCodeToDisplayName = (
  lang: Language,
  t: TFunction
): string => {
  switch (lang) {
    case "en":
      return t("english");
    case "ukr":
      return t("ukrainian");
    case "ru":
      return t("russian");
    default:
      return t("unknown");
  }
};
