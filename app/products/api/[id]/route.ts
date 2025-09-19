import { NextResponse } from "next/server";
import connectDB from "@/libs/db";
import Data from "@/libs/models";

interface RouteParams {
  params: { id: string };
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = params;
    console.log("id from API route:", id);

    // 1️⃣ Find current product
    const document = await Data.findOne({ _id: id });

    if (!document) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Find related products in the same category (exclude current product)
    const related = await Data.find({
      category: document.category,
      _id: { $ne: id },
    });

    // 3️⃣ Return both
    return NextResponse.json(
      { success: true, product: document, related },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}
