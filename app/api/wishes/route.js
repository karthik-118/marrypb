import { NextResponse } from "next/server";
import { getWishesCollection, isMongoConfigured } from "@/lib/mongodb";

// The MongoDB driver needs the Node.js runtime (not Edge), and this data
// must always be live — never statically cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isMongoConfigured) {
    // Not connected yet → the client falls back to browser storage.
    return NextResponse.json({ configured: false, wishes: [] });
  }
  try {
    const col = await getWishesCollection();
    const docs = await col
      .find({}, { projection: { name: 1, message: 1, created_at: 1 } })
      .sort({ created_at: -1 })
      .limit(500)
      .toArray();

    const wishes = docs.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      message: d.message,
      created_at: d.created_at,
    }));

    return NextResponse.json({ configured: true, wishes });
  } catch (err) {
    console.error("[wishes] read failed:", err);
    return NextResponse.json(
      { configured: true, wishes: [], error: "Could not load wishes." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  if (!isMongoConfigured) {
    return NextResponse.json(
      { error: "The guestbook is not connected yet." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const name = String(body.name || "").trim().slice(0, 60);
  const message = String(body.message || "").trim().slice(0, 500);

  if (!name || !message) {
    return NextResponse.json(
      { error: "Please add your name and a wish." },
      { status: 400 }
    );
  }

  try {
    const col = await getWishesCollection();
    const doc = { name, message, created_at: new Date().toISOString() };
    const result = await col.insertOne(doc);

    return NextResponse.json(
      { wish: { id: result.insertedId.toString(), ...doc } },
      { status: 201 }
    );
  } catch (err) {
    console.error("[wishes] write failed:", err);
    return NextResponse.json(
      { error: "Could not save your wish. Please try again." },
      { status: 500 }
    );
  }
}
