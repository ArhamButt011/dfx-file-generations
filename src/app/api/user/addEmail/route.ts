import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("DFXFileGeneration");

    const existingUser = await db
      .collection("promotions")
      .findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    await db.collection("promotions").insertOne({
      email: email.toLowerCase(),
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error for Pormotions:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
