import { Button, Input } from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabase } from "../../../utils/supabase/server";

export default function LoginPage() {
  async function handleSumbit(formData: FormData) {
    "use server";
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const supabase = createServerSupabase();
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">관리자 콘솔</h2>
        <form>
          <Input
            type="email"
            label="이메일"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="mb-4"
          />
          <Input
            type="password"
            label="비밀번호"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="mb-4"
          />
          <Button formAction={handleSumbit} type="submit">
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
}
