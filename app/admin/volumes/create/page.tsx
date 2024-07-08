import { Input, Button } from "@nextui-org/react";
import { createVolume } from "./actions";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          새 Volume 추가하기
        </h2>
        <form>
          <Input
            label="연도 (예: 2022)"
            id="year"
            name="year"
            placeholder="발간 연도를 입력해 주세요"
            className="mb-4"
          />
          <Input
            label="계절 (예: 가을겨울)"
            id="name"
            name="name"
            placeholder="'호'를 제외하고 입력해 주세요"
            className="mb-4"
          />
          <Button formAction={createVolume} type="submit">
            생성하기
          </Button>
        </form>
      </div>
    </div>
  );
}
