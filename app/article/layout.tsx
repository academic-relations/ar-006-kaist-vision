"use client";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  MenuItem,
  Box,
  Menu,
  MenuButton,
  MenuList,
  Button,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Article, articleDump } from "../utils";
import { useParams } from "next/navigation";
import { get } from "http";

type StoryButtonProps = { title: string; href?: string };

function StoryButton({ title, href }: StoryButtonProps) {
  return (
    <Link href={href ?? "#"}>
      <Button variant="ghost" w="100%" textAlign="left" alignContent="start">
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
      <Box position="fixed" right="5%" bottom="5%" zIndex={1}>
        <IconButton
          onClick={scrollToTop}
          isRound={true}
          variant="solid"
          aria-label="Scroll to top"
          size="xl"
          fontSize="48px"
          icon={<ChevronUpIcon />}
        />
      </Box>
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
      <Box w="100vw" h="calc(100%-52px)" display="flex" flexDir="row">
        <Box w="480px" h="100%" padding="16px" flexDir="column">
          <Menu>
            <MenuButton
              w="100%"
              mb="24px"
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {getVolumeName(currentVolume)}
            </MenuButton>
            <MenuList>
              {volumes.map((volume: string, index: number) => {
                return (
                  <Link key={index} href={`/article/${volume}/1`}>
                    <MenuItem>{getVolumeName(volume)}</MenuItem>
                  </Link>
                );
              })}
            </MenuList>
          </Menu>
          {articles.map((article: Article, index: number) => {
            return (
              <StoryButton
                key={index}
                title={article.category}
                href={`/article/${article.volume}/${article.index}`}
              />
            );
          })}
        </Box>
        <Box w="calc(100vw-480px)">{props.children}</Box>
      </Box>
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
    default:
      season = "오류";
      break;
  }
  return `20${volume.split("-")[0]}년 ${season}호`;
}

function getVolume(volume: string) {
  return articleDump.filter((article) => volume === article.volume);
}
