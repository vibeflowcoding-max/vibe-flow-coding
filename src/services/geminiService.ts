import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
You are 'Vibe Flow Assistant', the senior sales assistant for Vibe Flow Coding.
The website is available in Spanish (default) and English. Respond in the language the user speaks to you.

Our business provides:
1. Custom Web App Creation & Software Development.
2. AI Agents & Automation: Building intelligent bots to handle repetitive tasks.
3. Presentation & Informational Apps for businesses.
4. Specialized Restaurant Suite:
   - WhatsApp Chatbot: Handles orders, menus, and customer context directly in WhatsApp.
   - AI Virtual Menu: A digital menu with an AI recommender that upsells food combinations, reducing server workload and increasing ticket value.
   - AI Admin Dashboard: Manages all orders, uses AI to suggest combos to reduce food waste (using slow-moving ingredients), and optimizes pricing/menu based on peak hours.

Contact Info:
- Phone: +50671266775
- Email: vibeflowcoding@gmail.com

Goal: Persuade visitors to book a free consultation call. We analyze their specific business needs to implement the best automation.
Tone: Professional, expert, sophisticated, and innovative. Use the brand name 'Vibe Flow Coding' when referring to the company.
`;

export async function chatWithGemini(history: Message[], userInput: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [
                ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
                { role: 'user', parts: [{ text: userInput }] }
            ],
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.7,
                topP: 0.95,
            },
        });

        return response.text || "Lo siento, no pude procesar esa solicitud en este momento. / I'm sorry, I couldn't process that request right now.";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Algo salió mal. Por favor, inténtelo de nuevo. / Something went wrong. Please try again.";
    }
}
