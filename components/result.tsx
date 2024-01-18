import { Textarea } from "@nextui-org/input";
import geminiAPI from "@/app/api/gemini";

export default async function GeminiResp({ text }: { text: string }) {
  const resp = await geminiAPI(text);
  return <Textarea value={resp}></Textarea>;
}
