import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Suspense} from "react";
import Search from "@/components/search";
import GeminiResp from "@/components/result"
import {Skeleton} from "@nextui-org/skeleton";


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
      <Suspense key={query} fallback={<Skeleton className="h-3 w-3/5 rounded-lg"/>}>
        <GeminiResp text={query}/>
      </Suspense>
    </main>
  );
}
