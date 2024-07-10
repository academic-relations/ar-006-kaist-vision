import { Button } from "@nextui-org/react";
import { createServerSupabase } from "../../../../utils/supabase/server";
import { Article, Volume } from "../../../../utils/types";
import ArticlesTable from "./table";
import Link from "next/link";

type Props = {
  params: {
    volumeId: string;
  };
};

export default async function Page(props: Props) {
  const volumeId = Number(props.params.volumeId);
  const volume = await getVolume(volumeId);
  const articles = await getArticles(volumeId);

  return (
    <>
      <h2 className="m-3">{`${volume.year}년 ${volume.name}호 기사 목록`}</h2>
      <div className="flex-row">
        <Button
          className="m-3"
          as={Link}
          href={`/admin/create-edit-article?volumeId=${volumeId}&index=${getNextIndex(
            articles
          )}`}
        >
          새 기사 추가하기
        </Button>
        <div className="flex-1" />
      </div>
      <ArticlesTable articles={articles} />
    </>
  );
}

async function getArticles(volumeId: number): Promise<Article[]> {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("volume_id", volumeId)
    .order("index");
  return data ?? [];
}

async function getVolume(volumeId: number): Promise<Volume> {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from("volumes")
    .select("*")
    .eq("id", volumeId)
    .single();
  return data;
}

function getNextIndex(articles: Article[]) {
  const indexList = articles.map((article) => article.index);
  if (indexList.length === 0) {
    return 1;
  } else {
    return Math.max(...indexList) + 1;
  }
}
