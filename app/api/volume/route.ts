import { NextRequest, NextResponse } from "next/server";
import { data23summer } from "../../data/data-23-summer";

export async function GET(req: NextRequest) {
  return NextResponse.json(data23summer);
}
