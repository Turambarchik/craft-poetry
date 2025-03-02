import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";
import {
  SYSTEM_PROMPT_EN,
  SYSTEM_PROMPT_RU,
  SYSTEM_PROMPT_UKR,
  USER_PROMPT_EN,
  USER_PROMPT_RU,
  USER_PROMPT_UKR,
} from "utils/gptPrompts";
import { Language } from "utils/types/globalTypes";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { text, lang } = req.body as { text: string; lang: Language };
  if (!text) {
    return res.status(400).json({ error: "Text is required for analysis" });
  }

  let systemPrompt: string;
  let userPrompt: string;
  switch (lang) {
    case "ru":
      systemPrompt = SYSTEM_PROMPT_RU;
      userPrompt = USER_PROMPT_RU;
      break;
    case "ukr":
      systemPrompt = SYSTEM_PROMPT_UKR;
      userPrompt = USER_PROMPT_UKR;
      break;
    case "en":
    default:
      systemPrompt = SYSTEM_PROMPT_EN;
      userPrompt = USER_PROMPT_EN;
      break;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        // Добавлена инструкция "Return only valid JSON."
        {
          role: "user",
          content: `${userPrompt}\n\n"${text}"\n\nReturn only valid JSON with no additional text or formatting.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
      // response_format: { type: "json_object" },
    });

    const gptResponse = response.choices[0]?.message?.content;
    if (!gptResponse) {
      return res.status(500).json({ error: "Invalid response from OpenAI" });
    }

    try {
      const parsed = JSON.parse(gptResponse);
      return res.status(200).json(parsed);
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Response:", gptResponse);
      return res.status(500).json({
        error: "Error parsing GPT response",
        rawResponse: gptResponse,
      });
    }
  } catch (error) {
    console.error("GPT Error:", error);
    return res.status(500).json({ error: "Error analyzing haiku" });
  }
}
