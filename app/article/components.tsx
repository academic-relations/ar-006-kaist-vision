import Link from "next/link";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";

type KHeaderProps = {
  subtitle?: string;
  title: string;
  author: string;
  image?: string;
  caption?: string;
};

export const KHeader = (props: KHeaderProps) => (
  <div>
    <title className="mb-4 mt-12">{props.title}</title>
    <p className="font-lg font-bold mb-4">{props.author}</p>
    {props.image && (
      <Image
        src={props.image}
        className="m-0 w-full h-100"
        alt="Header Image"
      />
    )}
    <p className="mt-8 px-52">{props.caption}</p>
  </div>
);

type PProps = {
  children: string | string[];
};

export const KText = ({ children }: PProps) => (
  <p className="my-4 whitespace-pre-line">{children}</p>
);

type SubtitleProps = {
  children: string;
};

export const Subtitle = ({ children }: SubtitleProps) => (
  <title className="font-2xl mb-4 mt-12">{children}</title>
);

type IProps = {
  src: string;
  caption?: string;
  width?: number;
};

export const KImage = ({ src, caption, width }: IProps) => (
  <div className="max-w-120 max-h-120 px-auto py-1">
    <Image src={src} alt={caption ?? ""} className="max-w-120 max-h-120" />
    <p>{caption}</p>
  </div>
);

type KArticleProps = {
  children: React.ReactNode;
  header: React.ReactNode;
};

export const KArticle = (props: KArticleProps) => (
  <div className="m-0 p-0 w-full">
    {props.header}
    <div className="mx-md py-8">{props.children}</div>
    <div className="p-16 flex flex-row">
      <Card className="overflow-hidden w-120 h-60">
        <Image src="/images/23-summer/2-1.png" alt="Caffe Latte" />
        <CardBody>
          <title className="font-md">커버스토리</title>
          <p className="py-2">마약, 쾌락과 파멸 사이</p>
        </CardBody>
        <CardFooter>
          <Link href="/articles/23-summer/2">
            <Button variant="solid">이전글 보러가기</Button>
          </Link>
        </CardFooter>
      </Card>
      <div className="flex flex-1" />
      <Card className="overflow-hidden w-120 h-60">
        <Image src="/images/23-summer/4-0.jpg" alt="Caffe Latte" />
        <CardBody>
          <title className="font-md">미리 보는 대학수업</title>
          <p className="py-2">
            혁신과 창의성을 경험하라, 지능 로봇 설계 및 프로그래밍
          </p>
        </CardBody>
        <CardFooter>
          <Link href="/articles/23-summer/2">
            <Button variant="solid">다음글 보러가기</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  </div>
);
