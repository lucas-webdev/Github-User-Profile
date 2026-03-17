'use client'
import styles from './searchUser.module.css'
import { useState, FormEvent } from 'react'
import { SearchUserProps } from './types'

export function SearchUser({ onSearch, isLoading }: SearchUserProps) {
  const [username, setUsername] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(username.trim());
  }

  const handleChange = ((e: React.ChangeEvent<HTMLInputElement >) => setUsername(e.target.value))

    return (
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isLoading}>
          <div className={styles.formWrapper}>
            <label className="" htmlFor="username">GitHub username</label>
            <input 
              id="username" 
              type="text" 
              placeholder="Enter GitHub username to search" 
              value={username}
              onChange={handleChange}
              aria-required="true"
              aria-describedby="username-hint"
            />
            <span id="username-hint" className={styles.usernameHint}>Enter a github username to search for their profile and repositories</span>
          </div>
          <button disabled={isLoading || !username.trim()} type="submit" className={styles.button} aria-label={isLoading ? 'Searching...' : 'Search for Github user'}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </fieldset>
      </form>
    )
  }