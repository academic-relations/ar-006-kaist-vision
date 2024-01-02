import { KArticle, KHeader, KImage, KText, Subtitle } from "../../components";
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

const host =
  process.env.NODE_ENV === "production"
    ? "https://vision.sparcs.org"
    : "http://localhost:3000";

async function getArticle(volume: string, index: string) {
  const res = await axios.get(`${host}/api/article`, {
    params: {
      volume,
      index,
    },
  });
  return res.data;
}

export async function generateStaticParams() {
  const res = await axios.get(`${host}/api/volume`);

  return res.data.map((article: any) => ({
    volume: article.volume,
    index: article.index,
  }));
}
