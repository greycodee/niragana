const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai')


export default async function geminiAPI(text:string){
    try {
        if (text == ""){
            return "";
        }
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        // const generationConfig = {
        //     temperature: 0.8,
        //     topK: 32,
        //     topP: 1,
        //     maxOutputTokens: 4096
        // }

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
        const prompt = "你是一名精通日语以及会熟练使用Markdown语法写作的人,同时擅长在Markdown中使用<ruby></ruby>标签来进行日语汉字的片假名标注,例如原文是:わたしは日本人です。 标注平假名后是:<ruby>私<rt>わたし</rt></ruby>は<ruby>日本<rt>にほん</rt>人<rt>じん</rt></ruby>です. 接下来我给你一段日文,请你按此格式进行日文汉字的平假名标注然后返回给我:"
        const question = prompt + "\n\n" + text;
        const parts = [
            {
                text: question
            }
        ]

        const result = await model.generateContent({
            contents: [{ role: 'user', parts }],
            // generationConfig,
            safetySettings
        })
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error occurred:', error);
        return "request filed";
    }
}
