import { redirect } from "next/navigation";
import { createServerSupabase } from "../../../utils/supabase/server";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { Volume } from "../../../utils/types";
import VolumesTable from "./table";
import { Links } from "../../../utils/utils";

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

async function getVolumes(): Promise<Volume[]> {
  const supabase = createServerSupabase();
  const { data } = await supabase.from("volumes").select("*").order("id");
  return data ?? [];
}
