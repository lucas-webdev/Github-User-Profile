import { NextResponse } from "next/server";

export async function GET(req: Request){
    const { searchParams } = new URL(req.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')

    if (!owner || !repo) {
        return NextResponse.json(
            { error: 'Missing owner or repository' },
            { status: 400 }
        )
    };

    try {
        // API Doc for reference: https://docs.github.com/en/rest/repos/repos?apiVersion=2026-03-10#get-a-repository
        const res = await fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`, {
            headers: { Accept: 'application/vnd.github.v3+json' },
        })

        if (!res.ok) {
            if (res.status === 404) {
                return NextResponse.json(
                    { error: 'Repository not found'},
                    { status: 404 }
                )
            }

            return NextResponse.json(
                { error: 'Error fetching repository details'},
                { status: res.status }
            )
        }

        const data = await res.json()
        return NextResponse.json(data)
    } catch (err) {
        console.error('Error fetching repository details', err)
        return NextResponse.json(
            { error: 'Error fetching repository details'},
            { status: 500 }
        )
    }
}