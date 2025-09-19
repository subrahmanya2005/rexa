import { uploadImage } from "@/libs/upload-image";

import { NextRequest, NextResponse } from "next/server";



import connectDB from "@/libs/db";
import Data from "@/libs/models";



export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") as string;
    const file = formData.get("image") as File | null;
    console.log(name,category,price,file)

    // Upload image
    const data: any = await uploadImage(file, "next-js image gallery");
    const image_url = data?.secure_url;
    console.log("Uploaded image URL:", image_url);

    // Save to database
    await Data.create({
      name: name,
      image: image_url,
      description: description,
      category: category,
      price: price,
    });

    return new Response(JSON.stringify({ message: "Data saved successfully" }), {
      status: 200,
    });
  } catch (error: unknown) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to save data" }), {
      status: 500,
    });
  }
}





// Get all documents (GET /api/data)
export async function GET() {
  try {
    await connectDB();
    const allData = await Data.find({});

    return NextResponse.json({ success: true, data: allData }, { status: 200 });
  }
  catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error },
      { status: 400 }
    );
  }
}
