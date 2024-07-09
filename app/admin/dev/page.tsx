import { Button } from "@nextui-org/react";
import { changeImageUrl, createArticles, createVolumes } from "./actions";

export default function Page() {
  return (
    <h2>
      <form>
        <Button formAction={createVolumes} type="submit">
          2023년 볼륨 3개 추가하기
        </Button>
      </form>
      <form>
        <Button formAction={createArticles} type="submit">
          2023년 기사 모두 추가하기
        </Button>
      </form>
      <form>
        <Button formAction={changeImageUrl} type="submit">
          이미지 URL 바꾸기
        </Button>
      </form>
    </h2>
  );
}
