"use client";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { createClientSupabase } from "../../../utils/supabase/client";
import { useParams } from "next/navigation";

export default function Page() {
  const [volumes, setVolumes] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [caption, setCaption] = useState("");

  const [body, setBody] = useState<any[]>([]);

  useEffect(() => {
    const supabase = createClientSupabase();
    const fetchVolumes = async () => {
      const { data, error } = await supabase.from("volumes").select("*");
      setVolumes(data ?? []);
    };
    fetchVolumes();
  }, []);

  return (
    <div>
      <Select label="볼륨 선택" className="max-w-xs m-4">
        {volumes.map((volume) => (
          <SelectItem
            key={volume.id}
          >{`${volume.year}년 ${volume.name}호`}</SelectItem>
        ))}
      </Select>
      <Input
        label="기사 분류"
        className="m-4 w-96"
        value={category}
        onValueChange={setCategory}
      />
      <div className="m-4 text-lg">헤더</div>
      <Input
        label="기사 제목"
        className="m-4 w-3/4"
        value={title}
        onValueChange={setTitle}
      />
      <Input
        label="작성자"
        className="m-4 w-3/4"
        value={author}
        onValueChange={setAuthor}
      />
      <Textarea
        label="캡션"
        className="m-4"
        value={caption}
        onValueChange={setCaption}
      />
      <div className="m-4 text-lg">컨텐츠</div>
      {body.map((item, index) => {
        if (item.type === "subtitle") {
          return (
            <div className="m-4" key={index}>
              <div>소제목</div>
              <Input
                className="w-3/4"
                value={item.text}
                onValueChange={(text) => {
                  setBody((body) => {
                    const newBody = [...body];
                    newBody[index].text = text;
                    return newBody;
                  });
                }}
              />
            </div>
          );
        } else if (item.type === "text") {
          return (
            <div className="m-4" key={index}>
              <div>본문</div>
              <Textarea
                value={item.text}
                onValueChange={(text) => {
                  setBody((body) => {
                    const newBody = [...body];
                    newBody[index].text = text;
                    return newBody;
                  });
                }}
              />
            </div>
          );
        } else if (item.type === "image") {
          return (
            <div className="m-4" key={index}>
              <div>이미지</div>
              <Button>이미지 업로드</Button>
              <Input
                className="w-3/4 my-2"
                label="캡션"
                value={item.caption}
                onValueChange={(caption) => {
                  setBody((body) => {
                    const newBody = [...body];
                    newBody[index].caption = caption;
                    return newBody;
                  });
                }}
              />
            </div>
          );
        }
      })}
      <div className="row m-4 gap-4">
        <Button
          className="mr-4"
          onClick={() => {
            setBody((body) => [...body, { type: "subtitle", text: "" }]);
          }}
        >
          소제목 추가
        </Button>
        <Button
          className="mr-4"
          onClick={() => {
            setBody((body) => [...body, { type: "text", text: "" }]);
          }}
        >
          본문 추가
        </Button>
        <Button
          className="mr-4"
          onClick={() => {
            setBody((body) => [
              ...body,
              { type: "image", image: "", caption: "" },
            ]);
          }}
        >
          이미지 추가
        </Button>
      </div>
      <Button
        className="m-4"
        onClick={async () => {
          const supabase = createClientSupabase();
          const { data, error } = await supabase.from("articles").insert({
            volume: 3,
            index: 1,
            category,
            header: {
              title,
              author,
              caption,
            },
            body: "body",
          });
        }}
      >
        업로드
      </Button>
    </div>
  );
}
