import { KArticle, KHeader, KImage, KText, Subtitle } from "../../components";
import { data } from "../../../api/article/data";
import { useEffect, useState } from "react";
import axios from "axios";

export default async function ArticlePage({
  params,
}: {
  params: { volume: string; index: string };
}) {
  const article = await getArticle(params.volume, params.index);

  return (
    <KArticle
      header={
        <KHeader
          title={article?.header.title ?? "제목 없음"}
          author={article?.header.author ?? "작성자 없음"}
          image={article?.header.image}
          caption={article?.header.caption}
        />
      }
    >
      {article?.body.map((content: any, index: number) => {
        switch (content.type) {
          case "text":
            return <KText key={index}>{content.text as string}</KText>;
          case "image":
            return (
              <KImage
                key={index}
                src={content.image!}
                caption={content.caption}
              />
            );
          case "subtitle":
            return <Subtitle key={index}>{content.text as string}</Subtitle>;
          default:
            return null;
        }
      })}
    </KArticle>
  );
}

async function getArticle(volume: string, index: string) {
  const res = await axios.get("http://localhost:3000/api/article", {
    params: {
      volume,
      index,
    },
  });
  return res.data;
}
