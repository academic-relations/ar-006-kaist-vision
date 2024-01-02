import { NextRequest, NextResponse } from "next/server"
import { data } from "../data-23-summer"

export async function GET(req: NextRequest) {
  const volume = req.nextUrl.searchParams.get('volume')
  const index = req.nextUrl.searchParams.get('index')

  const article = data.find((article) => article.volume === volume && article.index === index )

  return NextResponse.json( article )
}
