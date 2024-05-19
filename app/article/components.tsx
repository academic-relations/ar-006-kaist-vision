import Link from "next/link";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import styles from "./KArticle.module.css";

type KHeaderProps = {
  subtitle?: string;
  title: string;
  author: string;
  image?: string;
  caption?: string;
};

export const KHeader = (props: KHeaderProps) => (
  <div className={styles.header}>
    <h1 className={styles.title}>{props.title}</h1>
    <p className={styles.author}>{props.author}</p>
    {props.image && (
      <Image
        src={props.image}
        className={styles.headerImage}
        alt="Header Image"
      />
    )}
    {props.caption && <p className={styles.caption}>{props.caption}</p>}
  </div>
);

type PProps = {
  children: string | string[];
};

export const KText = ({ children }: PProps) => (
  <p className={styles.text}>{children}</p>
);

type SubtitleProps = {
  children: string;
};

export const Subtitle = ({ children }: SubtitleProps) => (
  <h2 className={styles.subtitle}>{children}</h2>
);

type IProps = {
  src: string;
  caption?: string;
  width?: number;
};

export const KImage = ({ src, caption, width }: IProps) => (
  <div
    className={styles.imageContainer}
    style={{ width: width ? `${width}px` : "auto" }}
  >
    <Image src={src} alt={caption ?? ""} className={styles.image} />
    {caption && <p className={styles.imageCaption}>{caption}</p>}
  </div>
);

type KArticleProps = {
  children: React.ReactNode;
  header: React.ReactNode;
};

export const KArticle = (props: KArticleProps) => (
  <div className={styles.article}>
    {props.header}
    <div className={styles.content}>{props.children}</div>
    <div className={styles.footer}>
      <Card className={styles.card}>
        <Image
          src="/images/23-summer/2-1.png"
          alt="Caffe Latte"
          className={styles.cardImage}
        />
        <CardBody>
          <h3 className={styles.cardTitle}>커버스토리</h3>
          <p className={styles.cardText}>마약, 쾌락과 파멸 사이</p>
        </CardBody>
        <CardFooter>
          <Link href="/articles/23-summer/2">
            <Button variant="solid">이전글 보러가기</Button>
          </Link>
        </CardFooter>
      </Card>
      <div className="flex flex-1" />
      <Card className={styles.card}>
        <Image
          src="/images/23-summer/4-0.jpg"
          alt="Caffe Latte"
          className={styles.cardImage}
        />
        <CardBody>
          <h3 className={styles.cardTitle}>미리 보는 대학수업</h3>
          <p className={styles.cardText}>
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
