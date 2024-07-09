export const host =
  process.env.NODE_ENV === "production"
    ? "https://kaistvision.kaist.ac.kr"
    : "http://localhost:3000";

export function createImageUrl(path?: string) {
  return `https://jrglixhztdhphnzlkzrg.supabase.co/storage/v1/object/public${path}`;
}

// https://jrglixhztdhphnzlkzrg.supabase.co/storage/v1/object/public/images/23-wintera/2-0.jpeg
// https://jrglixhztdhphnzlkzrg.supabase.co/storage/v1/object/public/images/23-wintera/2_0.jpeg

export type Volume = {
  id: number;
  year: number;
  name: string;
};

export type Article = {
  id: number;
  volume_id: number;
  index: number;
  category: string;
  header: {
    title: string;
    author?: string;
    image?: string;
    caption?: string;
    image_caption?: string;
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
  width?: number;
  full_width?: boolean;
};

type ArticleReview = {
  type: "review";
  name: string;
  image: string;
  text: string;
};