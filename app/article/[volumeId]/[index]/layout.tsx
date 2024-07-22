import Link from "next/link";
import { Article } from "../../../../utils/types";
import { Button } from "@nextui-org/react";
import styles from "./Layout.module.css";
import TopButton from "../../../../components/top-button";
import VolumeSelect from "../../../../components/volume-select";
import { Links } from "../../../../utils/utils";
import {
  getCategories,
  getVisibleVolumes,
} from "../../../../utils/supabase/actions";
import { cookies } from "next/headers";

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
  const volumes = await getVisibleVolumes();

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
                  href={Links.article(article.volume_id, article.index)}
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
