import { GithubUserDetails, GithubRepositoryInfo } from '../types'

// Fetch Github user details by username
export async function fetchGithubUserDetails(username: string): Promise<GithubUserDetails> {
    const response = await fetch(`/api/github/user?username=${username}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch user details')
    }

    return response.json()
}

// Fetch repositories for a github username
export async function fetchGithubRepositoryList(username: string, page: number = 1, sortBy: 'updated' | 'stars' = 'updated'): Promise<GithubRepositoryInfo[]> {
    const response = await fetch(`/api/github/repos?username=${username}&page=${page}&sort=${sortBy}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch repositories')
    }

    return response.json()
}

// Fetch repository details
export async function fetchGithubRepositoryDetails(owner: string, repo: string): Promise<GithubRepositoryInfo> {
    const response = await fetch(`/api/github/repo-details?owner=${owner}&repo=${repo}`);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch repositories')
    }

    return response.json()
}