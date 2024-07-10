import { createServerSupabase } from "../../../../utils/supabase/server";
import { Article, ArticleImage } from "../../../../utils/types";
import { createImageUrl } from "../../../../utils/utils";
import {
  KArticle,
  KHeader,
  KImage,
  KReview,
  KText,
  Subtitle,
} from "../../components";

export default async function ArticlePage({
  params,
}: {
  params: { volumeId: string; index: string };
}) {
  const article = await getArticle(params.volumeId, params.index);

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
      neighbors={await getArticleWithNeighbors(params.volumeId, params.index)}
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

async function getArticle(volumeId: string, articleIndex: string) {
  const supabase = createServerSupabase();
  const { data: volume } = await supabase
    .from("volumes")
    .select("*")
    .eq("id", volumeId)
    .single();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("volume_id", volume.id)
    .eq("index", articleIndex)
    .single();
  return article as Article;
}

async function getArticleWithNeighbors(volumeId: string, articleIndex: string) {
  const supabase = createServerSupabase();
  const { data: previousArticle } = await supabase
    .from("articles")
    .select("*")
    .eq("volume_id", volumeId)
    .eq("index", Number(articleIndex) - 1)
    .single();

  const { data: nextArticle } = await supabase
    .from("articles")
    .select("*")
    .eq("volume_id", volumeId)
    .eq("index", Number(articleIndex) + 1)
    .single();

  return {
    previous: previousArticle
      ? {
          title: previousArticle.header.title,
          category: previousArticle.category,
          link: `/article/${previousArticle.volume_id}/${previousArticle.index}`,
          firstImage:
            previousArticle.header.image ??
            (
              previousArticle.body.find(
                (item: any) => item.type === "image"
              ) as ArticleImage
            )?.image,
        }
      : undefined,
    next: nextArticle
      ? {
          title: nextArticle.header.title,
          category: nextArticle.category,
          link: `/article/${nextArticle.volume_id}/${nextArticle.index}`,
          firstImage:
            nextArticle.header.image ??
            (
              nextArticle.body.find(
                (item: any) => item.type === "image"
              ) as ArticleImage
            )?.image,
        }
      : undefined,
  };
}
