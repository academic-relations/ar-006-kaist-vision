"use client";

import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Volume } from "../utils/types";
import { ChevronDownIcon } from "./icons";
import { Links } from "../utils/utils";

type Props = {
  volumes: Volume[];
  currentVolume: number;
};

export default function VolumeSelect(props: Props) {
  function getVolumeName(volume?: Volume) {
    if (!volume) return "";
    return `${volume.year}년 ${volume.name}호`;
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className={`w-full mb-6`} endContent={<ChevronDownIcon />}>
          {getVolumeName(
            props.volumes.find((v) => v.id === props.currentVolume)
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {props.volumes.map((volume: Volume, index: number) => {
          return (
            <DropdownItem key={index} href={Links.article(volume.id, 1)}>
              {getVolumeName(volume)}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
