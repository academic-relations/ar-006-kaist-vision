import { Card, CardBody, Image } from "@nextui-org/react";
import { Article, ArticleImage, articleDump } from "./utils";
import Link from "next/link";

export default async function Home() {
  const articles = await getVolume();

  return (
    <div className="w-full mx-16">
      <p className="mt-16 mb-9">2023년 가을겨울호</p>
      <div className="w-full space-x-6 flex flex-wrap">
        {articles
          .filter((article) => article.volume === "23-wintera")
          .map((article: Article, index: number) => {
            let imageUrl;
            if (article.header.image) {
              imageUrl = article.header.image;
            } else {
              const firstImage = article.body.find(
                (item) => item.type === "image"
              ) as ArticleImage;
              imageUrl = firstImage?.image;
            }

            return (
              <div key={index}>
                <Link href={`/article/${article.volume}/${article.index}`}>
                  <Card className="w-sm h-xl">
                    <CardBody>
                      <Image width={100} src={imageUrl} alt="image" />
                      <div className="mt-6 space-y-1">
                        <p className="text-sm">{article.category}</p>
                        <p className="text-md">{article.header.title}</p>
                        <p>{article.header.author}</p>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

async function getVolume() {
  return articleDump;
}
