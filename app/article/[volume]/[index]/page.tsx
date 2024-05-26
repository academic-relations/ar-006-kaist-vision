import { articleDump } from "../../../utils";
import {
  KArticle,
  KHeader,
  KImage,
  KReview,
  KText,
  Subtitle,
} from "../../components";

export default function ArticlePage({
  params,
}: {
  params: { volume: string; index: string };
}) {
  const article = getArticle(params.volume, params.index);

  return (
    <KArticle
      header={
        <KHeader
          title={article?.header.title ?? "제목 없음"}
          author={article?.header.author ?? ""}
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
                width={content.width}
                full_width={content.full_width}
              />
            );
          case "subtitle":
            return <Subtitle key={index}>{content.text as string}</Subtitle>;
          case "review":
            return (
              <KReview
                key={index}
                name={content.name}
                image={content.image}
                text={content.text}
              />
            );
          default:
            return null;
        }
      })}
    </KArticle>
  );
}

function getArticle(volume: string, index: string) {
  return articleDump.find(
    (article) => volume === article.volume && index === article.index
  );
}

export async function generateStaticParams() {
  return articleDump.map((article: any) => ({
    volume: article.volume,
    index: article.index,
  }));
}
