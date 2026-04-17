export const MOCK_EMAIL =
  process.env.DEFAULT_AUTHOR_EMAIL ?? "demo@example.com";

export enum PoetryForm {
  Sonnet = "Sonnet",
  Haiku = "Haiku",
}

export const SUPPORTED_LANGS = ["en", "ukr", "ru"] as const;
