import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PRODUCTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PRODUCT_CONTEXT = `
You are "Lumina AI", a helpful, witty, and knowledgeable shopping assistant for the Lumina e-commerce store.
Here is our current product catalog data in JSON format:
${JSON.stringify(PRODUCTS)}

Rules for your responses:
1. Always suggest specific products from the catalog using their exact names if they match the user's needs.
2. Be concise but friendly.
3. If a user asks for something we don't have, politely suggest the closest alternative from our catalog.
4. Do not invent products that are not in the list.
5. You can answer general questions about tech, fashion, and home decor, but always try to tie it back to Lumina products.
6. Format your response in Markdown. Use bolding for product names.
`;

export const createShoppingChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: PRODUCT_CONTEXT,
      temperature: 0.7,
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I'm having a bit of trouble connecting to the network right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently offline. Please check your internet connection or try again later.";
  }
};
