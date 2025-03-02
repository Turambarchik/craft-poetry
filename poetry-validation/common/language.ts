import { i18n as I18nType, TFunction } from "i18next";

function mapLanguageToReadableName(langCode: string): string {
  switch (langCode) {
    case "ru":
      return "русские";
    case "ukr":
      return "українські";
    case "en":
    default:
      return "english";
  }
}

export const validateLanguageCharacters = (
  text: string,
  t: TFunction,
  i18n: I18nType
): string[] => {
  const errors: string[] = [];
  const lang = i18n.language;

  let regex: RegExp;

  switch (lang) {
    case "ru":
      regex = /[^\p{sc=Cyrl}\s\.,'"\-:;?!(){}\[\]—]/gu;
      break;
    case "ukr":
      regex = /[^\p{sc=Cyrl}\s\.,'"\-:;?!(){}\[\]—]/gu;
      break;
    case "en":
    default:
      regex = /[^\p{sc=Latn}\s\.,'"\-:;?!(){}\[\]—]/gu;
      break;
  }

  const nonAllowedCharacters = text.match(regex);
  if (nonAllowedCharacters) {
    const langDisplay = mapLanguageToReadableName(lang);

    errors.push(
      t("only_allowed_characters", {
        characters: nonAllowedCharacters.join(", "),
        lang: langDisplay,
      })
    );
  }

  return errors;
};
