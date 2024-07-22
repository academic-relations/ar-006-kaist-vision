import { Button } from "@nextui-org/react";
import { Article } from "../../../../utils/types";
import ArticlesTable from "./table";
import Link from "next/link";
import { Links } from "../../../../utils/utils";
import { cookies } from "next/headers";
import { getArticles, getVolume } from "../../../../utils/supabase/actions";

type Props = {
  params: {
    volumeId: string;
  };
};

export default async function Page(props: Props) {
  const volumeId = props.params.volumeId;
  const volume = await getVolume(volumeId);
  const articles = await getArticles(Number(volumeId));

  return (
    <>
      <h2 className="m-3">{`${volume.year}년 ${volume.name}호 기사 목록`}</h2>
      <div className="flex-row">
        <Button
          className="m-3"
          as={Link}
          href={Links.createEditArticle(
            Number(volumeId),
            getNextIndex(articles)
          )}
        >
          새 기사 추가하기
        </Button>
        <div className="flex-1" />
      </div>
      <ArticlesTable articles={articles} />
    </>
  );
}

function getNextIndex(articles: Article[]) {
  const indexList = articles.map((article) => article.index);
  if (indexList.length === 0) {
    return 1;
  } else {
    return Math.max(...indexList) + 1;
  }
}
