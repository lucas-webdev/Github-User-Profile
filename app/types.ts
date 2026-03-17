export interface GithubUserDetails {
    avatar_url: string;
    name: string | null;
    login: string;
    followers: number;
    following: number;
    html_url: string;
    public_repos: number;
}

export interface GithubRepositoryInfo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    size: number;
    updated_at: string;
    owner: {
        login: string;
    }
    topics: string[],
    language: string
}