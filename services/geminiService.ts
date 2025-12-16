import { GoogleGenAI } from "@google/genai";

// System instruction to guide the AI's behavior
const SYSTEM_INSTRUCTION = `
You are "Sparky", the friendly and professional AI Academic Counselor for Spark Logic Institute. 
Your goal is to help prospective students understand our course offerings and guide them toward registration.

Key Information about Spark Logic:
1. **Mission**: We train and provide placement assistance for DevOps and Full Stack development.
2. **DevOps Course Covers**: Linux, Shell Scripting, Git, Jenkins, AWS, Docker, Kubernetes, Ansible, Terraform, Prometheus, and Grafana.
3. **Full Stack Course Covers**: HTML, CSS3, Responsive Design, Bootstrap5, JavaScript, NodeJS, APIs (MySQL, MongoDB, JSON, ExpressJS), ReactJS, Git.
4. **Placement**: We provide 100% placement assistance.
5. **Tone**: Encouraging, professional, knowledgeable, and concise.

If a user asks about pricing, exact dates, or location, kindly ask them to fill out the registration form or contact the administration directly, as you don't have real-time access to that specific administrative data.
Always encourage them to start their career with Spark Logic.
`;

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    const client = getClient();
    
    // Convert history to format expected by the SDK if needed, 
    // but for simple single-turn or maintained chat instance we can use chat.
    // Here we will create a new chat session for simplicity with history injection.
    
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble connecting to the server right now. Please try again later or contact our support team directly.";
  }
};