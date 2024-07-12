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
} from "@nextui-org/react";
import Link from "next/link";
import { Volume } from "../../../utils/types";
import { createClientSupabase } from "../../../utils/supabase/client";
import { toast } from "sonner";

type Props = {
  volumes: Volume[];
};

export default function VolumesTable({ volumes }: Props) {
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
                    const { data, error } = await supabase
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
              <TableCell>
                <Button as={Link} href={`/admin/volumes/${volume.id}`}>
                  기사 목록 보기
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
