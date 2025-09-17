import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

// GET: list foods
export async function GET() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("foods")
    .select("id,name,description,price,category,image_url,image_path,created_at")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ foods: data });
}

// POST: create food (expects multipart/form-data with file)
export async function POST(request) {
  try {
    const supabase = createSupabaseServerClient();

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Content-Type must be multipart/form-data" }, { status: 400 });
    }

    const form = await request.formData();
    const name = form.get("name");
    const description = form.get("description") || null;
    const category = form.get("category");
    const price = Number(form.get("price"));
    const file = form.get("file");

    if (!name || !category || Number.isNaN(price)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let image_path = null;
    let image_url = null;

    if (file && typeof file === "object") {
      const ext = (file.name?.split(".").pop() || "jpg").toLowerCase();
      // Store at the bucket root to avoid duplicated path segments in the public URL
      const objectName = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("food-images")
        .upload(objectName, file, { cacheControl: "3600", upsert: false });
      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        return NextResponse.json({ error: `Storage error: ${uploadError.message}` }, { status: 500 });
      }
      image_path = objectName;
      const { data: urlData } = supabase.storage.from("food-images").getPublicUrl(objectName);
      image_url = urlData?.publicUrl || null;
    }

    const { data, error } = await supabase
      .from("foods")
      .insert({ name, description, category, price, image_path, image_url })
      .select()
      .single();
    
    if (error) {
      console.error("Database insert error:", error);
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
    }
    
    return NextResponse.json({ food: data }, { status: 201 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: `Server error: ${err.message}` }, { status: 500 });
  }
}



