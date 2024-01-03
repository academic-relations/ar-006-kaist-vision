"use client";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  MenuItem,
  Box,
  Image,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  Button,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  return (
    <>
      <Box w="100vw" h="calc(100%-52px)" display="flex" flexDir="row">
        <Box w="480px" h="100%" padding="16px" display="flex" flexDir="column">
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
              <MenuItem disabled>2023년 봄호</MenuItem>
              <MenuItem>2023년 여름호</MenuItem>
            </MenuList>
          </Menu>
          <StoryButton title="편집장 인사" href="/articles/23-summer/1" />
          <StoryButton title="커버스토리" href="/articles/23-summer/2" />
          <StoryButton title="잡입 수사" href="/articles/23-summer/3" />
          <StoryButton
            title="미리 보는 대학수업"
            href="/articles/23-summer/4"
          />
          <StoryButton title="연구실 Zoom-in" />
          <StoryButton title="돋보기" />
          <StoryButton title="KAISTian 어셈블" />
          <StoryButton title="동아리" />
          <StoryButton title="카이열컷" />
          <StoryButton title="카이누리가 간다" />
          <StoryButton title="(주)카눌투어" />
          <StoryButton title="카눌극장" />
          <StoryButton title="ON-NURI" />
          <StoryButton title="KAIST-MOOCs" />
          <StoryButton title="연구쏙쏙" />
          <StoryButton title="독자 참여" />
          <StoryButton title="카이스타그램" />
          <StoryButton title="입시정보" />
          <StoryButton title="편집후기" />
        </Box>
        <Box w="calc(100vw-480px)">{props.children}</Box>
      </Box>
      <TopButton />
    </>
  );
}
