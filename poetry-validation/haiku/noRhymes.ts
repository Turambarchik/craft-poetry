import { TFunction } from "i18next";
import { RiTa } from "rita";

/**
 * Cleans a word by removing trailing punctuation and converting it to lowercase.
 * @param word - The word to clean.
 * @returns The cleaned word.
 */
const cleanWord = (word: string | undefined): string => {
  return word?.replace(/[^\w\s]/g, "").toLowerCase() || "";
};

/**
 * Extracts phonemes of a word using RiTa.analyze().
 * @param word - The word to analyze.
 * @returns The phonemes as a string array.
 */
const getPhonemes = (word: string): string[] => {
  const analysis = RiTa.analyze(word);
  // @ts-expect-error RiTa.analyze does not return a type that includes 'phones'
  const phonemes = analysis?.phones || ""; // Use 'phones' key to access phonemes
  return phonemes.split("-"); // Split phonemes by hyphen
};

/**
 * Checks if two words rhyme based on their phonemes.
 * @param word1 - First word.
 * @param word2 - Second word.
 * @returns True if the words rhyme.
 */
const wordsRhyme = (word1: string, word2: string): boolean => {
  const phonemes1 = getPhonemes(word1);
  const phonemes2 = getPhonemes(word2);

  if (phonemes1.length === 0 || phonemes2.length === 0) return false;

  // Compare the last two phonemes for rhyme
  const last1 = phonemes1.slice(-2).join("-");
  const last2 = phonemes2.slice(-2).join("-");

  return last1 === last2;
};

/**
 * Validates the absence of rhymes in the last words of the lines.
 * @param lines - Array of haiku lines.
 * @returns An array of errors if any lines end with rhyming words.
 */
export const validateNoRhymes = (lines: string[], t: TFunction): string[] => {
  const errors: string[] = [];
  const lastWords = lines.map((line) => cleanWord(line.split(" ").pop()));
  for (let i = 0; i < lastWords.length - 1; i++) {
    for (let j = i + 1; j < lastWords.length; j++) {
      if (wordsRhyme(lastWords[i], lastWords[j])) {
        errors.push(t("lines_rhyme_error", { line1: i + 1, line2: j + 1 }));
      }
    }
  }
  return errors;
};
