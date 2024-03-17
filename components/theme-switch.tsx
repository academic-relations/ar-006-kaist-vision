"use client";

import { VisuallyHidden, useSwitch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { MoonIcon, SunIcon } from "./icons";

export function ThemeSwitch() {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (isSelected) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [isSelected, setTheme]);

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-8 h-8",
              "flex items-center justify-center",
              "rounded-lg bg-default-100 hover:bg-default-200",
            ],
          })}
        >
          {isSelected ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
    </div>
  );
}
