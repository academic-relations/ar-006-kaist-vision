"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { Article } from "../../../../utils/types";
import { VerticalDotsIcon } from "../../../../components/icons";
import { toast } from "sonner";
import { createClientSupabase } from "../../../../utils/supabase/client";
import { useRouter } from "next/navigation";

type Props = {
  articles: Article[];
};

export default function ArticlesTable({ articles }: Props) {
  const router = useRouter();

  const onDelete = async (volumeId: number) => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) {
      toast("삭제가 취소되었습니다.");
      return;
    }
    const supabase = createClientSupabase();
    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", volumeId);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("기사가 성공적으로 삭제되었습니다.");
      router.refresh();
    }
  };

  return (
    <Table className="flex flex-1" isStriped>
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>순서</TableColumn>
        <TableColumn>카테고리</TableColumn>
        <TableColumn>제목</TableColumn>
        <TableColumn>작업</TableColumn>
      </TableHeader>
      <TableBody>
        {articles.map((article: Article) => {
          return (
            <TableRow key={article.id}>
              <TableCell>{article.id}</TableCell>
              <TableCell>{article.index}</TableCell>
              <TableCell>{article.category}</TableCell>
              <TableCell>{article.header.title}</TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <VerticalDotsIcon className="text-default-300" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {/* <DropdownItem as={Link} href={}>
                      수정
                    </DropdownItem> */}
                    <DropdownItem onClick={() => onDelete(article.id)}>
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
