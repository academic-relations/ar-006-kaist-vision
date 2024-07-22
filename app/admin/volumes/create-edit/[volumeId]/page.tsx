"use server";
import { Input, Button } from "@nextui-org/react";
import { createServerSupabase } from "../../../../../utils/supabase/server";
import { redirect } from "next/navigation";
import { Links } from "../../../../../utils/utils";
import { cookies } from "next/headers";
import { getVolume } from "../../../../../utils/supabase/actions";

type Props = {
  params: {
    volumeId: string;
  };
};

export default async function Page(props: Props) {
  const volume = await getVolume(props.params.volumeId);

  async function editVolume(formData: FormData) {
    "use server";
    const year = formData.get("year") as string;
    const name = formData.get("name") as string;

    const supabase = createServerSupabase();
    const { error } = await supabase
      .from("volumes")
      .update({ year, name })
      .eq("id", volume.id);
    if (error) {
      console.log(error);
    } else {
      redirect(Links.adminVolumes);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Volume 내용 수정하기
        </h2>
        <form>
          <Input label="ID" disabled value={volume.id} className="mb-4" />
          <Input
            label="연도 (예: 2022)"
            id="year"
            name="year"
            placeholder="발간 연도를 입력해 주세요"
            className="mb-4"
            defaultValue={volume.year}
          />
          <Input
            label="계절 (예: 가을겨울)"
            id="name"
            name="name"
            placeholder="'호'를 제외하고 입력해 주세요"
            className="mb-4"
            defaultValue={volume.name}
          />
          <Button formAction={editVolume} type="submit">
            변경하기
          </Button>
        </form>
      </div>
    </div>
  );
}
