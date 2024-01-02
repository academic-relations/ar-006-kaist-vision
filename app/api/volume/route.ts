import { NextRequest, NextResponse } from "next/server"
import { data } from "../data-23-summer"

export async function GET(req: NextRequest) {
  return NextResponse.json( data )
}
