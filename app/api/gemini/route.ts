const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai')
import { NextResponse } from 'next/server'
  
export async function POST(req:Request) {
    try {
        const { text } = await req.json()
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const generationConfig = {
            temperature: 0,
            topK: 1,
            topP: 0.5,
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
        const prompt = "你是一名精通日语以及会熟练使用Markdown语法写作的人,同时擅长在Markdown中使用<ruby></ruby>标签来进行日语汉字的平假名标注,例如原文是:私は日本人です。 标注平假名后是:<ruby>私<rt>わたし</rt></ruby>は<ruby>日本<rt>にほん</rt>人<rt>じん</rt></ruby>です. 请将:["
        const prompt2 = "]按此格式进行日文汉字的平假名标注然后返回给我,我需要准确无误的平假名版本，用于语言学习目的。请确保每个汉字或片假名的对应平假名都是正确的。"
        const question = prompt + text +prompt2;
        const parts = [
            {
                text: question
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
        return NextResponse.json({ data: "Request Error" }, { status: 500 })
    }
}