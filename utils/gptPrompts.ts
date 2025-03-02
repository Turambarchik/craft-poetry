export const SYSTEM_PROMPT_EN =
  "You are an expert in Japanese poetry, especially haiku. Analyze haiku for adherence to the 5-7-5 syllable structure and Japanese poetic aesthetics. Return a structured JSON object with the following keys: technicalErrors, technicalWarnings, semanticErrors, semanticWarnings, and suggestions.";
export const SYSTEM_PROMPT_RU =
  "Вы эксперт по японской поэзии, особенно хайку. Проанализируйте хайку на соблюдение структуры 5-7-5 и японской поэтической эстетики. Верните структурированный JSON объект с следующими ключами: technicalErrors, technicalWarnings, semanticErrors, semanticWarnings и suggestions.";
export const SYSTEM_PROMPT_UKR =
  "Ви експерт з японської поезії, зокрема хайку. Проаналізуйте хайку на відповідність структурі 5-7-5 та японській поетичній естетиці. Поверніть структурований JSON-об'єкт з наступними ключами: technicalErrors, technicalWarnings, semanticErrors, semanticWarnings та suggestions.";

export const USER_PROMPT_EN =
  "Analyze the following haiku and return a JSON object with this structure:\n" +
  "{\n" +
  '  "technicalErrors": ["List all technical errors"],\n' +
  '  "technicalWarnings": ["List all technical warnings"],\n' +
  '  "semanticErrors": ["List all semantic errors"],\n' +
  '  "semanticWarnings": ["List all semantic warnings"],\n' +
  '  "suggestions": "Provide a summary of recommendations to improve the haiku"\n' +
  "}";
export const USER_PROMPT_RU =
  "Проанализируйте следующее хайку и верните JSON-объект со следующей структурой:\n" +
  "{\n" +
  '  "technicalErrors": ["Перечислите все технические ошибки"],\n' +
  '  "technicalWarnings": ["Перечислите все технические предупреждения"],\n' +
  '  "semanticErrors": ["Перечислите все семантические ошибки"],\n' +
  '  "semanticWarnings": ["Перечислите все семантические предупреждения"],\n' +
  '  "suggestions": "Дайте рекомендации по улучшению хайку"\n' +
  "}";
export const USER_PROMPT_UKR =
  "Проаналізуйте наступне хайку і поверніть JSON-об'єкт із наступною структурою:\n" +
  "{\n" +
  '  "technicalErrors": ["Перелічіть всі технічні помилки"],\n' +
  '  "technicalWarnings": ["Перелічіть всі технічні попередження"],\n' +
  '  "semanticErrors": ["Перелічіть всі семантичні помилки"],\n' +
  '  "semanticWarnings": ["Перелічіть всі семантичні попередження"],\n' +
  '  "suggestions": "Надайте рекомендації щодо покращення хайку"\n' +
  "}";
