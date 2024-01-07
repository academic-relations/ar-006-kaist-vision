import { NextRequest, NextResponse } from "next/server";
import { data23spring } from "../data-23-summer";

export async function GET(req: NextRequest) {
  const volume = req.nextUrl.searchParams.get("volume");
  const index = req.nextUrl.searchParams.get("index");

  const article = data23spring.find(
    (article) => article.volume === volume && article.index === index
  );

  return NextResponse.json(article);
}
