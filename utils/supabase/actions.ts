import { cookies } from "next/headers";
import { createServerSupabase } from "./server";
import { Article, ArticleImage, Volume } from "../types";

export async function getRecentVolume() {
  const supabase = createServerSupabase();
  const { data: volumes } = await supabase
    .from("volumes")
    .select("*")
    .eq("is_visible", true)
    .order("id", { ascending: false })
    .limit(1);
  return volumes ? volumes[0] : null;
}

export async function getArticles(volumeId: number) {
  const supabase = createServerSupabase();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .eq("volume_id", volumeId)
    .order("index");
  return articles as Article[];
}

export async function getArticle(volumeId: string, articleIndex: string) {
  const supabase = createServerSupabase();
  const { data: volume } = await supabase
    .from("volumes")
    .select("*")
    .eq("id", volumeId)
    .single();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("volume_id", volume.id)
    .eq("index", articleIndex)
    .single();
  return article as Article;
}

export async function getArticleWithNeighbors(
  volumeId: string,
  articleIndex: string
) {
  const supabase = createServerSupabase();
  const { data: previousArticle } = await supabase
    .from("articles")
    .select("*")
    .eq("volume_id", volumeId)
    .eq("index", Number(articleIndex) - 1)
    .single();

  const { data: nextArticle } = await supabase
    .from("articles")
    .select("*")
    .eq("volume_id", volumeId)
    .eq("index", Number(articleIndex) + 1)
    .single();

  return {
    previous: previousArticle
      ? {
          title: previousArticle.header.title,
          category: previousArticle.category,
          link: `/article/${previousArticle.volume_id}/${previousArticle.index}`,
          firstImage:
            previousArticle.header.image ??
            (
              previousArticle.body.find(
                (item: any) => item.type === "image"
              ) as ArticleImage
            )?.image,
        }
      : undefined,
    next: nextArticle
      ? {
          title: nextArticle.header.title,
          category: nextArticle.category,
          link: `/article/${nextArticle.volume_id}/${nextArticle.index}`,
          firstImage:
            nextArticle.header.image ??
            (
              nextArticle.body.find(
                (item: any) => item.type === "image"
              ) as ArticleImage
            )?.image,
        }
      : undefined,
  };
}

export async function getVolumes(): Promise<Volume[]> {
  const supabase = createServerSupabase();
  const { data } = await supabase.from("volumes").select("*").order("id");
  return data ?? [];
}

export async function getVolume(volumeId: string) {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from("volumes")
    .select("*")
    .eq("id", volumeId)
    .single();
  return data;
}

export async function getCategories(volumeId: number) {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("volume_id", volumeId)
    .order("index", { ascending: true });
  return data ?? [];
}

export async function getVisibleVolumes(): Promise<Volume[]> {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from("volumes")
    .select("*")
    .eq("is_visible", true)
    .order("id");
  return data ?? [];
}
