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
import { Article, ArticleImage, host } from "./utils";
import Link from "next/link";
import { data } from "./api/data-23-summer";

export default async function Home() {
  const articles = await getVolume();

  return (
    <Box w="100%" m="72px">
      <Heading mb="36px">2023년 여름호</Heading>
      <Wrap w="100%" align="center" spacing="24px">
        {articles.map((article: Article, index: number) => {
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
  return data;
}
