import { formatDate } from '../app/utils/dateUtils'
import { formatRepoSize } from '../app/utils/formatUtils'
import Link from 'next/link'
import { RepositoryItemProps } from './types'

export function RepositoryItem({ repository }: RepositoryItemProps) {
    return (
        <article style={{display: 'flex', flexDirection: 'column', gap: 12}} aria-labelledby={`repo-${repository.id}`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2}}>
                <h3 id={`repo-${repository.id}`}>{repository.name}</h3>
                <Link href={`/repo/${repository.owner.login}/${repository.name}`}> View details </Link>
                <p style={{margin: 0}}>{repository.description || "No description available"}</p>
            </div>
            <ul style={{margin: 0}} aria-label="Repository stats">
                <li>Stars: {repository.stargazers_count}</li>
                <li>Forks: {repository.forks_count}</li>
                <li>Open Issues: {repository.open_issues}</li>
                <li>Size: {formatRepoSize(repository.size)}</li>
                <li>Last update: {formatDate(repository.updated_at)}</li>
            </ul>
            <p>
                View on github: {" "}
                <a href={repository.html_url} target="_blank" rel="noopener noreferrer" aria-label="Open repository in Github in new tab">
                    {repository.name}
                </a>
            </p>
        </article>
    )
}