"use server";
import { redirect } from "next/navigation";
import { createServerSupabase } from "../../../../utils/supabase/server";

export async function createVolume(formData: FormData) {
  const supabase = createServerSupabase();

  const data = {
    year: formData.get("year") as string,
    name: formData.get("name") as string,
  };

  const { error } = await supabase.from("volumes").insert(data);
  if (error) {
    console.log(error);
  } else {
    redirect("/admin");
  }
}
