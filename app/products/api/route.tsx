import { NextResponse } from "next/server";
import connectDB from "@/libs/db";
import Data from "@/libs/models";


export async function GET() {
  try{
    await connectDB();
    const allData=await Data.find({});
    
    return NextResponse.json({success:true,data:allData},{status:200});
  }
  catch(error:any){
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
