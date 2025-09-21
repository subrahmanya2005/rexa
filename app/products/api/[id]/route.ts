import { NextResponse } from "next/server";
import connectDB from "@/libs/db";
import Data from "@/libs/models";


export async function GET(_request: Request, context: any) {
  try {
    const id = context.params.id; // ✅ no await
    console.log("id from API route:", id);

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id parameter" },
        { status: 400 }
      );
    }

    await connectDB();

    const document = await Data.findById(id);

    if (!document) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const related = await Data.find({
      category: document.category,
      _id: { $ne: id },
    });

    return NextResponse.json(
      { success: true, product: document, related },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
}

