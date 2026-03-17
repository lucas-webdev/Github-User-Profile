import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = (searchParams.get("username") || "").trim();

  if (!username) {
    return NextResponse.json({ error: "username is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
      next: { revalidate: 60 }
    });


    if (!res.ok) {
      if(res.status === 404) {
        return NextResponse.json(
          { error: "User not found"},
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { error: "Unable to fetch user", status: res.status },
        { status: 502 }
      );
    }
    const data = await res.json();

    return NextResponse.json(data);
    
  } catch {
    return NextResponse.json({ error: "Network failure" }, { status: 500 });
  }
}