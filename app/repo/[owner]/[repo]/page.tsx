'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchGithubRepositoryDetails } from '../../../services/githubFetch'
import { GithubRepositoryInfo } from '../../../types.ts'
import { formatDate } from '../../../utils/dateUtils'
import { formatRepoSize } from '../../../utils/formatUtils'

interface RepoDetailsPageProps {
  params: {
    owner: string;
    repo: string;
  }
}

export default function RepoPage({ params }: RepoDetailsPageProps) {
    const { owner, repo } = params
    const [repoDetails, setRepoDetails] = useState<GithubRepositoryInfo | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string|null>(null)

    useEffect(() => {
      const fetchRepoDetails = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
          const data = await fetchGithubRepositoryDetails(owner, repo)
          setRepoDetails(data)
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Failed to load repository details';
          setErrorMessage(errorMsg)
        } finally {
          setIsLoading(false)
        }
      }

      fetchRepoDetails()
    }, [owner, repo])

  
    return (
      <main id="main" className="container">
        <header className="header">
          <h1>Repo Details</h1>
          <Link href='/'>Back to search</Link>
        </header>

        {isLoading && (
          <div>Loading...</div>
        )}

        {!isLoading && errorMessage && (
          <div style={{ color: 'red'}}>
            <strong>Error:</strong>
            {errorMessage}
          </div>
        )}

        {!isLoading && !repoDetails && !errorMessage && (
          <div>Repository not found</div>
        )}

        {!isLoading && repoDetails && (
          <section style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 8,
            border: '1px solid #eaeaea',
            borderRadius: '5px',
            marginTop: '16px',
            padding: 12
          }}>
            <h2>{repoDetails.name}</h2>
            <span>{repoDetails.full_name}</span>
            {repoDetails.description && (
              <p>{repoDetails.description}</p>
            )}

            <h3>Stats</h3>
            <ul style={{margin: 0}}>
                <li>Stars: {repoDetails.stargazers_count}</li>
                <li>Forks: {repoDetails.forks_count}</li>
                <li>Open Issues: {repoDetails.open_issues_count}</li>
                <li>Size: {formatRepoSize(repoDetails.size)}</li>
                <li>Last update: {formatDate(repoDetails.updated_at)}</li>
            </ul>
            <p>
                <a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer">
                  View on github
                </a>
            </p>
          </section>
        )}

      </main>
    );
  }