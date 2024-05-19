"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Article, articleDump } from "../utils";
import { useParams } from "next/navigation";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { ChevronUpIcon } from "../../components/icons";

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

function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <div className={`fixed right-16 bottom-16 z-10`}>
        <Button
          onClick={scrollToTop}
          color="primary"
          aria-label="Scroll to top"
          size="lg"
          endContent={<ChevronUpIcon />}
        >
          맨 위로
        </Button>
      </div>
    )
  );
}

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const currentVolume = useParams().volume as string;
  const articles = getVolume(currentVolume);

  const volumes = Array.from(
    new Set(articleDump.map((article) => article.volume))
  );

  return (
    <>
      <div className={`w-full min-h-full flex flex-row`}>
        <div className={`w-160 h-full p-4 flex flex-col`}>
          <Dropdown>
            <DropdownTrigger>
              <Button className={`w-full mb-6`} endContent={<ChevronUpIcon />}>
                {getVolumeName(currentVolume)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {volumes.map((volume: string, index: number) => {
                return (
                  <DropdownItem key={index} href={`/article/${volume}/1`}>
                    {getVolumeName(volume)}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
          {articles.map((article: Article, index: number) => {
            return (
              <ArticleButton
                key={index}
                title={article.category}
                href={`/article/${article.volume}/${article.index}`}
              />
            );
          })}
        </div>
        <div className={`w-full`}>{props.children}</div>
      </div>
      <TopButton />
    </>
  );
}

function getVolumeName(volume: string) {
  let season = "";
  switch (volume.split("-")[1]) {
    case "spring":
      season = "봄";
      break;
    case "summer":
      season = "여름";
      break;
    case "wintera":
      season = "가을겨울";
      break;
    default:
      season = "오류";
      break;
  }
  return `20${volume.split("-")[0]}년 ${season}호`;
}

function getVolume(volume: string) {
  return articleDump.filter((article) => volume === article.volume);
}
