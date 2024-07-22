import { createImageUrl } from "../../../../utils/utils";
import {
  KArticle,
  KHeader,
  KImage,
  KReview,
  KText,
  Subtitle,
} from "../../components";
import {
  getArticle,
  getArticleWithNeighbors,
} from "../../../../utils/supabase/actions";

export default async function ArticlePage({
  params,
}: {
  params: { volumeId: string; index: string };
}) {
  const article = await getArticle(params.volumeId, params.index);
  const neighbors = await getArticleWithNeighbors(
    params.volumeId,
    params.index
  );

  return (
    <KArticle
      header={
        <KHeader
          title={article?.header.title ?? "제목 없음"}
          author={article?.header.author ?? ""}
          image={article?.header.image}
          caption={article?.header.caption}
          image_caption={article?.header.image_caption}
        />
      }
      neighbors={neighbors}
    >
      {article?.body.map((content: any, index: number) => {
        switch (content.type) {
          case "text":
            return <KText key={index}>{content.text as string}</KText>;
          case "image":
            return (
              <KImage
                key={index}
                src={createImageUrl(content.image)}
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
