"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Article } from "../../../../utils/types";

type Props = {
  articles: Article[];
};

export default function ArticlesTable({ articles }: Props) {
  return (
    <Table className="flex flex-1" isStriped>
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>순서</TableColumn>
        <TableColumn>카테고리</TableColumn>
        <TableColumn>제목</TableColumn>
      </TableHeader>
      <TableBody>
        {articles.map((article: Article) => {
          return (
            <TableRow key={article.id}>
              <TableCell>{article.id}</TableCell>
              <TableCell>{article.index}</TableCell>
              <TableCell>{article.category}</TableCell>
              <TableCell>{article.header.title}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
