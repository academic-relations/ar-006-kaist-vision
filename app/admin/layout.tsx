import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar isBordered>
        <NavbarBrand>
          <Link href="/admin">
            <p className="font-bold text-inherit">관리자 콘솔</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              홈페이지로 돌아가기
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              href="/auth/logout"
              color="primary"
              variant="flat"
            >
              로그아웃
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {children}
    </>
  );
}
