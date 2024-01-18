import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Suspense} from "react";
import Search from "@/components/search";
import GeminiResp from "@/components/result"

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <main className="flex flex-col justify-center items-center space-y-4">
      <Search/>
      <Suspense fallback={<div>loading...</div>}>
        <GeminiResp text={query}/>
      </Suspense>
      
    </main>
  );
}
