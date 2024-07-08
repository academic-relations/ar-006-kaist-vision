import { redirect } from "next/navigation";
import { createServerSupabase } from "../../../utils/supabase/server";

export async function GET(request: Request) {
  const supabase = createServerSupabase();

  await supabase.auth.signOut();

  return redirect("/");
}
