import { redirect } from "next/navigation";
import { createServerSupabase } from "../../../utils/supabase/server";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import VolumesTable from "./table";
import { Links } from "../../../utils/utils";
import { cookies } from "next/headers";
import { getVolumes } from "../../../utils/supabase/actions";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const supabase = createServerSupabase();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const volumes = await getVolumes();

  return (
    <>
      <div className="flex flex-row gap-6 p-6">
        <div className="w-240px">
          <h2 className="m-3">Volume</h2>
          <Button className="m-3" as={Link} href={Links.volumeCreate}>
            새 Volume 추가하기
          </Button>
          <VolumesTable volumes={volumes} />
        </div>
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </>
  );
}
