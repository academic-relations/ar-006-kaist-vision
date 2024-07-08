"use client";
import { useEffect, useState } from "react";
import { ChevronUpIcon } from "./icons";
import { Button } from "@nextui-org/react";

export default function TopButton() {
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
