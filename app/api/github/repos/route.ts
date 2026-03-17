import { NextResponse } from "next/server";

const PER_PAGE = 20;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const username = (searchParams.get("username") || "").trim();
    const page = searchParams.get("page") || "1";
    const sortBy = searchParams.get("sort") || "updated"

    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 })
    }

    try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=${PER_PAGE}&page=${page}&sort=${sortBy}`, {
            headers: { Accept: 'application/vnd.github.v3+json' },
            next: { revalidate: 60 }
        });        

        if (!res.ok) {
            return NextResponse.json(
              { error: 'Unable to fetch repositories' },
              { status: res.status }
            );
          }

          const data = await res.json();
          return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching repos', error)
        return NextResponse.json({ error: "Error fetching repositories" }, { status: 500 });
    }
}