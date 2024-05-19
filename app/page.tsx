import { Card, CardBody, Image } from "@nextui-org/react";
import NextImage from "next/image";
import { Article, ArticleImage, articleDump } from "./utils";
import Link from "next/link";
import styles from "./Home.module.css";

export default async function Home() {
  const articles = await getVolume();

  return (
    <div className="container mx-auto px-4">
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1>KAIST 비전</h1>
          <p>
            KAIST 공식 학생홍보대사 카이누리가 직접 기자가 되어 기획, 취재, 기사
            작성까지 모두 도맡아 1년에 2번, 각 반기별 한 번씩 발간하는
            홍보지입니다.
          </p>
          <p>
            최근 화제가 된 현상이나 기술 등을 과학적으로 접근하여 알려주는
            커버스토리를 시작으로 KAIST 소속 연구실, 학과, 동아리 소개 그리고
            KAISTian의 생활까지 KAIST의 이모저모를 담고 있습니다.
          </p>
          <p>
            저희 카이누리는 모든 독자들에게 조금 더 유익하고 재미있는 잡지를
            만들기 위해서 끊임없이 노력하고 있습니다.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <NextImage
            src="/images/cover.jpeg"
            alt="KAIST 비전"
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </div>
      </div>
      <p className="text-2xl font-semibold mt-16 mb-9 ms-6 text-left">
        2023년 가을겨울호
      </p>
      <div className="flex flex-wrap justify-center gap-6">
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
              <div key={index} className="max-w-sm w-full lg:w-1/3">
                <Link href={`/article/${article.volume}/${article.index}`}>
                  <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-w-16 aspect-h-9">
                      <Image
                        src={imageUrl}
                        alt="image"
                        className="w-full h-full object-cover rounded-t-md"
                      />
                    </div>
                    <CardBody className="p-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">
                          {article.category}
                        </p>
                        <p className="text-lg font-semibold">
                          {article.header.title}
                        </p>
                        <p className="text-gray-700">{article.header.author}</p>
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
