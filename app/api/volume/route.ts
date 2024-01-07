import { NextRequest, NextResponse } from "next/server";
import { data23spring } from "../data-23-summer";

export async function GET(req: NextRequest) {
  return NextResponse.json(data23spring);
}
