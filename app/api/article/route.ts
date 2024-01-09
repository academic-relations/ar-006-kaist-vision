import { NextRequest, NextResponse } from "next/server";
import { data23summer } from "../../data/data-23-summer";

export async function GET(req: NextRequest) {
  const volume = req.nextUrl.searchParams.get("volume");
  const index = req.nextUrl.searchParams.get("index");

  const article = data23summer.find(
    (article) => article.volume === volume && article.index === index
  );

  return NextResponse.json(article);
}
