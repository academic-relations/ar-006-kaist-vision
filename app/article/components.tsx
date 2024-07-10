import Link from "next/link";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import styles from "./KArticle.module.css";
import { createImageUrl } from "../../utils/utils";

type KHeaderProps = {
  subtitle?: string;
  title: string;
  author: string;
  image?: string;
  caption?: string;
  image_caption?: string;
};

export const KHeader = (props: KHeaderProps) => (
  <div className={styles.header}>
    <h1 className={styles.title}>{props.title}</h1>
    <p className={styles.author}>{props.author}</p>
    {props.image && (
      <Image
        src={createImageUrl(props.image)}
        className={styles.headerImage}
        alt="Header Image"
      />
    )}
    {props.image_caption && (
      <figcaption className={styles.imageCaption}>
        {props.image_caption}
      </figcaption>
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

type KImageProps = {
  src: string;
  caption?: string;
  width?: number;
  full_width?: boolean;
};

export const KImage = ({ src, caption, width, full_width }: KImageProps) => (
  <div
    className={styles.imageContainer}
    style={{ width: full_width ? "1024px" : width ? `${width}px` : "auto" }}
  >
    <Image
      src={src}
      alt={caption ?? ""}
      className={styles.image}
      width={full_width ? "100%" : width || "auto"}
      style={{
        height: "auto",
        maxHeight: full_width ? "auto" : "500px",
      }}
    />
    {caption && <p className={styles.imageCaption}>{caption}</p>}
  </div>
);

type KReviewProps = {
  name: string;
  image: string;
  text: string;
};

export const KReview = ({ name, image, text }: KReviewProps) => (
  <div className="flex items-center p-4 my-6 bg-blue-50 rounded-lg shadow-md">
    <div className="flex-shrink-0">
      <Image className="w-24 h-24 rounded-full" src={image} alt={name} />
    </div>
    <div className="ml-4">
      <div className="text-xl font-medium text-gray-900">{name}</div>
      <p className="mt-2 text-gray-600">{text}</p>
    </div>
  </div>
);

type KNeighborProps = {
  title: string;
  category: string;
  link: string;
  firstImage: string;
};

type KNeighborCardProps = { isPrevious?: boolean } & KNeighborProps;

const KNeighborCard = (props: KNeighborCardProps) => (
  <Card className={styles.card}>
    <Image
      src={createImageUrl(props.firstImage)}
      alt="기사 이미지"
      className={styles.cardImage}
    />
    <CardBody>
      <h3 className={styles.cardTitle}>{props.category}</h3>
      <p className={styles.cardText}>{props.title}</p>
    </CardBody>
    <CardFooter>
      <Link href={props.link}>
        <Button variant="solid">
          {props.isPrevious ? "이전글 보러가기" : "다음글 보러가기"}
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

type KArticleProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  neighbors: {
    previous?: KNeighborProps;
    next?: KNeighborProps;
  };
};

export const KArticle = (props: KArticleProps) => (
  <div className={styles.article}>
    {props.header}
    <div className={styles.content}>{props.children}</div>
    <div className={styles.footer}>
      {props.neighbors.previous && (
        <KNeighborCard {...props.neighbors.previous} isPrevious />
      )}
      <div className="flex flex-1" />
      {props.neighbors.next && <KNeighborCard {...props.neighbors.next} />}
    </div>
  </div>
);
