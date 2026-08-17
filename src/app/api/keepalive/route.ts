import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // Ping the database by selecting a minimal amount of data
    const { data, error } = await supabase
      .from("reports")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Keepalive DB Ping Error:", error);
      return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      status: "ok",
      message: "Database pinged successfully to prevent auto-pause.",
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({ status: "error", error: err.message }, { status: 500 });
  }
}
