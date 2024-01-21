import { data23spring } from "./data/data-23-spring";
import { data23summer } from "./data/data-23-summer";
import { data23wintera } from "./data/data-23-wintera";

export const host =
  process.env.NODE_ENV === "production"
    ? "https://vision.sparcs.org"
    : "http://localhost:3000";

export type Article = {
  volume: string;
  index: string;
  category: string;
  header: {
    title: string;
    author?: string;
    image?: string;
    caption?: string;
  };
  body: (ArticleSubtitle | ArticleText | ArticleImage | ArticleReview)[];
};

type ArticleText = {
  type: "text";
  text: string;
};

type ArticleSubtitle = {
  type: "subtitle";
  text: string;
};

export type ArticleImage = {
  type: "image";
  image: string;
  caption?: string;
};

type ArticleReview = {
  type: "review";
  name: string;
  image: string;
  text: string;
};

export const articleDump: Article[] = [
  ...data23spring,
  ...data23summer,
  ...data23wintera,
];
