"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRef } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleOnPress = () => {
    let textAreaRefCurrent = ref.current;
    const params = new URLSearchParams(searchParams);
    if (textAreaRefCurrent != null && textAreaRefCurrent.value != null) {
      params.set("query", textAreaRefCurrent.value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <Button color="primary" className="max-w-xs" onPress={handleOnPress}>
        添加注音
      </Button>
      <Textarea
        ref={ref}
        label="Description"
        placeholder="Enter your description"
        className="max-w-xs"
      />
    </div>
  );
}
