import { NextResponse } from "next/server";
import connectDB from "@/libs/db";
import Data from "@/libs/models";

// Update a document (PUT /admin/api/[id])
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id parameter" },
        { status: 400 }
      );
    }

    await connectDB();
    const body = await request.json();

    const updated = await Data.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ success: false, error: errMsg }, { status: 400 });
  }
}

// Delete a document (DELETE /admin/api/[id])
export async function DELETE(
  _request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id parameter" },
        { status: 400 }
      );
    }

    await connectDB();
    const deleted = await Data.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deleted }, { status: 200 });
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ success: false, error: errMsg }, { status: 400 });
  }
}
