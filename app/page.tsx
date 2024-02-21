import {
  Card,
  CardBody,
  Heading,
  Stack,
  Wrap,
  WrapItem,
  Image,
  Text,
  Box,
  AspectRatio,
} from "@chakra-ui/react";
import { Article, ArticleImage, articleDump } from "./utils";
import Link from "next/link";

export default async function Home() {
  const articles = await getVolume();

  return (
    <Box w="100%" mx="72px">
      <Heading mt="72px" mb="36px">
        2023년 가을겨울호
      </Heading>
      <Wrap w="100%" align="center" spacing="24px">
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
              <WrapItem key={index}>
                <Link href={`/article/${article.volume}/${article.index}`}>
                  <Card w="sm" h="xl">
                    <CardBody>
                      <AspectRatio ratio={1}>
                        <Image src={imageUrl} borderRadius="lg" />
                      </AspectRatio>
                      <Stack mt="6" spacing="3">
                        <Heading size="sm">{article.category}</Heading>
                        <Heading size="md">{article.header.title}</Heading>
                        <Text>{article.header.author}</Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </Link>
              </WrapItem>
            );
          })}
      </Wrap>
      <Heading mt="72px" mb="36px">
        2023년 여름호
      </Heading>
      <Wrap w="100%" align="center" spacing="24px">
        {articles
          .filter((article) => article.volume === "23-summer")
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
              <WrapItem key={index}>
                <Link href={`/article/${article.volume}/${article.index}`}>
                  <Card w="sm" h="xl">
                    <CardBody>
                      <AspectRatio ratio={1}>
                        <Image src={imageUrl} borderRadius="lg" />
                      </AspectRatio>
                      <Stack mt="6" spacing="3">
                        <Heading size="sm">{article.category}</Heading>
                        <Heading size="md">{article.header.title}</Heading>
                        <Text>{article.header.author}</Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </Link>
              </WrapItem>
            );
          })}
      </Wrap>
      <Heading mt="72px" mb="36px">
        2023년 봄호
      </Heading>
      <Wrap w="100%" align="center" spacing="24px">
        {articles
          .filter((article) => article.volume === "23-spring")
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
              <WrapItem key={index}>
                <Link href={`/article/${article.volume}/${article.index}`}>
                  <Card w="sm" h="xl">
                    <CardBody>
                      <AspectRatio ratio={1}>
                        <Image src={imageUrl} borderRadius="lg" />
                      </AspectRatio>
                      <Stack mt="6" spacing="3">
                        <Heading size="sm">{article.category}</Heading>
                        <Heading size="md">{article.header.title}</Heading>
                        <Text>{article.header.author}</Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </Link>
              </WrapItem>
            );
          })}
      </Wrap>
    </Box>
  );
}

async function getVolume() {
  return articleDump;
}
