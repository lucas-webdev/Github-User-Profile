import { useState, useMemo, useEffect } from 'react'
import { RepositoryListProps } from './types'
import { GithubRepositoryInfo} from '../app/types'
import { fetchGithubRepositoryList } from '../app/services/githubFetch'
import { RepositoryItem } from './RepositoryItem'

export function RepositoryList({initialRepositories, username, totalPublicRepos}: RepositoryListProps) {
    const [repositoriesList, setRepositoriesList] = useState<GithubRepositoryInfo[]>(initialRepositories)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState<'updated'|'stars'>('updated')
    const [isLoading, setIsLoading] = useState(false)
    
    const hasMore = repositoriesList.length < totalPublicRepos;

    const sortedList = useMemo(() => {
        const sorted = [...repositoriesList]

        if (sortBy === 'stars') {
            return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count)
        }
        
        return sorted.sort((a, b) => {
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        })
    }, [repositoriesList, sortBy])

    const handleLoadMore = async () => {
        setIsLoading(true)
        try {
            const nextPage = currentPage + 1;
            
            // Needs 'updated' fixed because there is no 'stars' option
            const newRepos = await fetchGithubRepositoryList(username, nextPage, 'updated');
            const updatedList = [...repositoriesList, ...newRepos];

            setRepositoriesList(updatedList);
            setCurrentPage(nextPage);
        } catch (err) {
            console.error('Error loading more repos', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value as 'updated' | 'stars'
        setSortBy(newSort)
    }
    
    return (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2>Repositories</h2>
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                <label htmlFor="sortToggle">Sort by:</label>
                <select 
                    name="sort-repositories-by" 
                    id="sortToggle" 
                    onChange={handleSortChange} 
                    value={sortBy} 
                    disabled={isLoading}
                    aria-label="Sort repositories by"
                >
                    <option value="updated">Recently Updated</option>
                    <option value="stars">Most Starred</option>
                </select>
            </div>
            <div role="list" aria-label="Repositories list" aria-live="polite">
                {sortedList.map((item) => (
                    <div key={item.id} role="listitem">
                        <RepositoryItem repository={item} />
                    </div>
                ))}
            </div>
            <div aria-label={`Number of repositories listed: ${sortedList.length} of ${totalPublicRepos}`}>Showing {sortedList.length} of {totalPublicRepos}</div>
            {hasMore && (
                <button 
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    style={{ padding: '8px 12px', marginTop: '12px', cursor: isLoading ? 'not-allowed' : 'pointer' }}
                    aria-label={isLoading ? 'Loading...' : 'Load more repositories'}
                >
                    {isLoading ? 'Loading...' : 'Load More'}
                </button>
            )}
        </section>
    )
}