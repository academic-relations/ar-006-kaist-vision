import {
  Box,
  Heading,
  Text,
  Container,
  Card,
  Image,
  Button,
  CardBody,
  CardFooter,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";

type KHeaderProps = {
  subtitle?: string;
  title: string;
  author: string;
  image?: string;
  caption?: string;
};

export const KHeader = (props: KHeaderProps) => (
  <Box textAlign="center">
    {/* <Text fontSize="lg" my="24px">
      {props.caption}
    </Text> */}
    <Heading as="h1" mb={4} mt="48px">
      <Text as="span">{props.title}</Text>
    </Heading>
    <Text fontSize="lg" fontWeight="bold" mb={4}>
      {props.author}
    </Text>
    {props.image && (
      <Image
        bgImage={props.image}
        bgBlendMode="saturation"
        bgSize="cover"
        bgPosition="center"
        m={0}
        w="100%"
        h="400px"
        textAlign="center"
      />
    )}
    <Text mt={8} px="200px">
      {props.caption}
    </Text>
  </Box>
);

type PProps = {
  children: string | string[];
};

export const KText = ({ children }: PProps) => (
  <Text textAlign="start" whiteSpace="pre-line" my={4}>
    {children}
  </Text>
);

type SubtitleProps = {
  children: string;
};

export const Subtitle = ({ children }: SubtitleProps) => (
  <Heading as="h2" fontSize="2xl" mb={4} mt={12}>
    {children}
  </Heading>
);

type IProps = {
  src: string;
  caption?: string;
  width?: number;
};

export const KImage = ({ src, caption, width }: IProps) => (
  <Box maxW="500px" w={width} maxHeight="500px" px="auto" py={4}>
    <Image src={src} alt={caption ?? ""} maxW="500px" maxHeight="500px" />
    <Text>{caption}</Text>
  </Box>
);

type KArticleProps = {
  children: React.ReactNode;
  header: React.ReactNode;
};

export const KArticle = (props: KArticleProps) => (
  <Box m={0} p={0} width="100%">
    {props.header}
    <Container maxW="container.md" py={8}>
      {props.children}
    </Container>
    <Box p={16} flexDir="row" display="flex">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        h={240}
        w={480}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="/images/23-summer/2-1.png"
          alt="Caffe Latte"
        />
        <Stack>
          <CardBody>
            <Heading size="md">커버스토리</Heading>
            <Text py="2">마약, 쾌락과 파멸 사이</Text>
          </CardBody>
          <CardFooter>
            <Link href="/articles/23-summer/2">
              <Button variant="solid" colorScheme="blue">
                이전글 보러가기
              </Button>
            </Link>
          </CardFooter>
        </Stack>
      </Card>
      <Box flex={1} />
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        h={240}
        w={480}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="/images/23-summer/4-0.jpg"
          alt="Caffe Latte"
        />
        <Stack>
          <CardBody>
            <Heading size="md">미리 보는 대학수업</Heading>
            <Text py="2">
              혁신과 창의성을 경험하라, 지능 로봇 설계 및 프로그래밍
            </Text>
          </CardBody>
          <CardFooter>
            <Link href="/articles/23-summer/2">
              <Button variant="solid" colorScheme="blue">
                다음글 보러가기
              </Button>
            </Link>
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  </Box>
);
