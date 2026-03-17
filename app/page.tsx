'use client'

import { useState, useEffect, useRef } from 'react';
import { SearchUser } from '../components/SearchUser'
import { fetchGithubUserDetails, fetchGithubRepositoryList } from './services/githubFetch'
import { GithubUserDetails, GithubRepositoryInfo } from './types'
import { UserProfile } from '../components/UserProfile'
import { RepositoryList } from '../components/RepositoryList'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userData, setUserData] = useState<GithubUserDetails | null>(null)
  const [repositoriesList, setRepositoriesList] = useState<GithubRepositoryInfo[]>([])
  const [error, setError] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  // Move focus to results after search
  useEffect(() => {
    if (userData && !isLoading && resultsRef.current){
      resultsRef.current.focus()
    }
  }, [userData, isLoading])

  const clearStates = () => {
    setIsLoading(true)
    setError(null)
    setUserData(null)
    setRepositoriesList([])
  }

  const handleSearch = async(username: string) => {
    clearStates();

    try {
      const [userDataResponse, repositoriesListResponse] = await Promise.all([
        fetchGithubUserDetails(username),
        fetchGithubRepositoryList(username)
      ])
      setUserData(userDataResponse)
      setRepositoriesList(repositoriesListResponse)
    } catch (err) {
      const errorMessage = err?.message || 'An error ocurred. Please try again'
      setError(errorMessage);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main id="main" style={{ padding: 16 }}>
      <h1>GitHub Profile Explorer</h1>
      <p>
        Starter project for the frontend coding challenge. Follow README.md.
      </p>

      <hr />

      {/* Status messages for screen readers */}
      <div 
        ref={statusRef}
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        style={{ 
          position: 'absolute', 
          left: '-10000px', 
          width: '1px', 
          height: '1px', 
          overflow: 'hidden' 
        }}
      >
        {isLoading && 'Loading user data...'}
        {error && `Error: ${error}`}
        {userData && !isLoading && `Loaded profile for ${userData.name || userData.login}`}
      </div>

      <section aria-label="Search section" style={{ marginBottom: 20}}>
        <h2>Search</h2>
        <SearchUser onSearch={handleSearch} isLoading={isLoading} />
      </section>

      {isLoading && (
        <div role="status" aria-live="polite">Loading...</div>
      )}

      {error && (
        <div role="alert" style={{ color: 'red', marginBottom: 12 }}>
          <strong>Error: </strong>
          <span>{error}</span>
        </div>
      )}

      
      {!isLoading && !error && userData && <div>
        {/* TODO: Candidate implements UserBadge */}
        <section aria-label="User section">
          <h2>User</h2>
            <UserProfile userData={userData} />
        </section>

        {/* TODO: Candidate implements RepoList */}
        <section aria-label="Repositories list section">
          <RepositoryList 
            initialRepositories={repositoriesList} 
            username={userData.login} 
            totalPublicRepos={userData.public_repos} 
          />
        </section>
      </div>
      }
    </main>
  );
}