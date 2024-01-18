const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai')
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const generationConfig = {
            temperature: 0.8,
            topK: 32,
            topP: 1,
            maxOutputTokens: 4096
        }

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE
            }
        ]

        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const prompt = "Write a story about a magic backpack."
        const question = prompt + "\n\n" + request.text;
        const parts = [
            {
                text: 'hello'
            }
        ]

        const result = await model.generateContent({
            contents: [{ role: 'user', parts }],
            generationConfig,
            safetySettings
        })
        const response = await result.response;
        return NextResponse.json({ data: response.text() }, { status: 200 })

    } catch (error) {
        console.error('Error occurred:', error);
        return NextResponse.json({ error: "Request Error" }, { status: 500 })
    }
}