import { Input, Button } from "@nextui-org/react";

export default function Page() {
  function editVolume(formData: FormData) {
    const year = formData.get("year") as string;
    const name = formData.get("name") as string;

    console.log(year, name);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Volume 내용 수정하기
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
          <Button formAction={editVolume} type="submit">
            생성하기
          </Button>
        </form>
      </div>
    </div>
  );
}
