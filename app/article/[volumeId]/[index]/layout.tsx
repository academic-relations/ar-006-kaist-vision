import Link from "next/link";
import { Article, Volume } from "../../../../utils/types";
import { Button } from "@nextui-org/react";
import styles from "./Layout.module.css";
import TopButton from "../../../../components/top-button";
import { createServerSupabase } from "../../../../utils/supabase/server";
import VolumeSelect from "../../../../components/volume-select";

type ArticleButtonProps = { title: string; href?: string };

function ArticleButton({ title, href }: ArticleButtonProps) {
  return (
    <Link href={href ?? "#"}>
      <Button className={`w-full text-left`} variant="light">
        {title}
      </Button>
    </Link>
  );
}

type LayoutProps = {
  children: React.ReactNode;
  params: {
    volumeId: number;
  };
};

export default async function Layout(props: LayoutProps) {
  const currentVolume = Number(props.params.volumeId);
  const categories = await getCategories(currentVolume);
  const volumes = await getVolumes();

  return (
    <>
      <div
        className={`w-full min-h-full flex flex-row`}
        suppressHydrationWarning
      >
        <div className={styles.sidebar}>
          <VolumeSelect volumes={volumes} currentVolume={currentVolume} />
          <div className={styles.sidebarContent}>
            {categories.map((article: Article, index: number) => {
              return (
                <ArticleButton
                  key={index}
                  title={article.category}
                  href={`/article/${article.volume_id}/${article.index}`}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.mainContent}>{props.children}</div>
      </div>
      <TopButton />
    </>
  );
}

async function getCategories(volumeId: number) {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("volume_id", volumeId)
    .order("index", { ascending: true });
  return data ?? [];
}

async function getVolumes(): Promise<Volume[]> {
  const supabase = createServerSupabase();
  const { data } = await supabase.from("volumes").select("*");
  return data ?? [];
}
