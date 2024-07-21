"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { Volume } from "../../../utils/types";
import { createClientSupabase } from "../../../utils/supabase/client";
import { toast } from "sonner";
import { VerticalDotsIcon } from "../../../components/icons";
import { Links } from "../../../utils/utils";
import { redirect } from "next/navigation";

type Props = {
  volumes: Volume[];
};

export default function VolumesTable({ volumes }: Props) {
  const onDelete = async (volumeId: number) => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) {
      toast("삭제가 취소되었습니다.");
      return;
    }
    const supabase = createClientSupabase();
    const { error } = await supabase
      .from("volumes")
      .delete()
      .eq("id", volumeId);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("볼륨이 성공적으로 삭제되었습니다.");
      redirect(Links.adminVolumes);
    }
  };

  return (
    <Table fullWidth={false}>
      <TableHeader>
        <TableColumn width={90}>ID</TableColumn>
        <TableColumn width={90}>연도</TableColumn>
        <TableColumn width={120}>계절</TableColumn>
        <TableColumn width={60}>배포</TableColumn>
        <TableColumn width={120}>작업</TableColumn>
      </TableHeader>
      <TableBody>
        {volumes.map((volume: Volume) => {
          const volumeLink = Links.adminVolume(volume.id);
          console.log(`Volume Link for ID ${volume.id}:`, volumeLink); // Console log to check the link
          return (
            <TableRow key={volume.id}>
              <TableCell>{volume.id}</TableCell>
              <TableCell>{volume.year}</TableCell>
              <TableCell>{volume.name}</TableCell>
              <TableCell>
                <Checkbox
                  defaultSelected={volume.is_visible}
                  onValueChange={async (isSelected) => {
                    const supabase = createClientSupabase();
                    const { error } = await supabase
                      .from("volumes")
                      .update({ is_visible: isSelected })
                      .eq("id", volume.id);
                    if (error) {
                      toast(error.message);
                    } else {
                      toast("볼륨의 게시여부가 성공적으로 변경되었습니다.");
                    }
                  }}
                />
              </TableCell>
              <TableCell className="flex flex-row items-center gap-2">
                <Button as={Link} href={volumeLink}>
                  기사 목록 보기
                </Button>
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <VerticalDotsIcon className="text-default-300" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>수정</DropdownItem>
                    <DropdownItem onClick={() => onDelete(volume.id)}>
                      삭제
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
