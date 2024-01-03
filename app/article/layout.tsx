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
import { Article, host } from "../utils";
import { data } from "../api/data-23-summer";

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

export default async function Layout(props: LayoutProps) {
  const articles = await getVolume();

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
              2023년 여름호
            </MenuButton>
            <MenuList>
              <MenuItem>2023년 여름호</MenuItem>
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

async function getVolume() {
  return data;
}
