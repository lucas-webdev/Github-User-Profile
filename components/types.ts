import { GithubUserDetails, GithubRepositoryInfo } from '../types'

export interface SearchUserProps {
    onSearch: (username: string) => void;
    isLoading: boolean;
}

export interface UserProfileProps {
    userData: GithubUserDetails;
}

export interface RepositoryItemProps {
    repository: GithubRepositoryInfo;
}

export interface RepositoryListProps {
    initialRepositories: GithubRepositoryInfo[]
    username: string
}