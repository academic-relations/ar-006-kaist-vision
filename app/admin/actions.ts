"use server";

import { redirect } from "next/navigation";
import { createServerSupabase } from "../../utils/supabase/server";

export async function logout() {
  const supabase = createServerSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("로그아웃 중 오류가 발생했습니다.", error);
  } else {
    redirect("/");
  }
}
