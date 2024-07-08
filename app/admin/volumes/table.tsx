"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { Volume } from "../../../utils/types";

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
