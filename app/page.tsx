'use client'
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {useState} from "react";
import { useRef } from "react";
import {Skeleton} from "@nextui-org/skeleton";


export default function Page() {
  const [text,setText] = useState("");
  const [loading,setLoading] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleOnPress = async () => {
    setLoading(true);
    let textAreaRefCurrent = ref.current;

    const data = {
      text:textAreaRefCurrent==null?"":textAreaRefCurrent.value
    }
    console.log("req-data:",data);
    console.log("req-data2:");
    const response = await fetch("/api/gemini",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    });

    const result = await response.json();
    console.log("result:",result);
    console.log("req-data2:");
    setText(result.data)
    setLoading(false);
  };


  return (
    <main className="flex flex-col justify-center items-center space-y-4">
      <Button color="primary" className="max-w-xs" onPress={handleOnPress}>
        添加注音
      </Button>
      <Textarea
        ref={ref}
        label="Description"
        placeholder="Enter your description"
        className="max-w-xs"
      />
      {loading ? <Skeleton className=" w-full h-20 rounded-medium" /> : <Textarea placeholder="ひらがな" value={text}></Textarea>}
    </main>
  );
}
