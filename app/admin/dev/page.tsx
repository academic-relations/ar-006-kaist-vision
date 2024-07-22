import { Button } from "@nextui-org/react";
import { data23spring, data23wintera } from "./data";
import { createServerSupabase } from "../../../utils/supabase/server";
import { Article } from "../../../utils/types";

export default function Page() {
  async function createVolumes() {
    "use server";
    const supabase = createServerSupabase();
    const { error } = await supabase.from("volumes").insert([
      {
        year: "2023",
        name: "봄",
      },
      {
        year: "2023",
        name: "여름",
      },
      {
        year: "2023",
        name: "가을겨울",
      },
    ]);
    if (error) {
      console.log(error);
    }
  }

  async function createArticles() {
    "use server";
    const supabase = createServerSupabase();
    const article23spring = data23spring.map((article) => {
      return {
        volume_id: 10,
        index: article.index,
        category: article.category,
        header: article.header,
        body: article.body,
      };
    });
    const article23summer = data23spring.map((article) => {
      return {
        volume_id: 11,
        index: article.index,
        category: article.category,
        header: article.header,
        body: article.body,
      };
    });
    const article23wintera = data23wintera.map((article) => {
      return {
        volume_id: 12,
        index: article.index,
        category: article.category,
        header: article.header,
        body: article.body,
      };
    });
    await supabase
      .from("articles")
      .insert([...article23spring, ...article23summer, ...article23wintera]);
  }

  function changeUrl(url: string) {
    const array = url.split("/");
    return `/${array[1]}/${array[2]}/${array[3].replace("-", "_")}`;
  }

  async function changeImageUrl() {
    "use server";
    const supabase = createServerSupabase();
    const { data: articles, error } = await supabase
      .from("articles")
      .select("*");

    if (error) {
      console.error("Error fetching articles:", error);
      return;
    }

    for (let article of articles) {
      let updatedHeader = {
        ...article.header,
      };
      if (updatedHeader.image)
        updatedHeader.image = changeUrl(updatedHeader.image);

      const body = (article as Article).body;
      const newBody = body.map((item) => {
        if (item.type === "image") {
          return { ...item, image: changeUrl(item.image) };
        } else if (item.type === "review") {
          return { ...item, image: changeUrl(item.image) };
        } else {
          return item;
        }
      });

      // articles 테이블을 업데이트합니다.
      const { error: updateError } = await supabase
        .from("articles")
        .update({
          header: updatedHeader,
          body: newBody,
        })
        .eq("id", article.id);

      if (updateError) {
        console.error(`Error updating article ID ${article.id}:`, updateError);
      } else {
        console.log(`Article ID ${article.id} updated successfully.`);
      }
    }
  }

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
