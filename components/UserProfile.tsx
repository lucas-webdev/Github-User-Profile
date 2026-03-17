import { UserProfileProps } from './types'
import styles from './userProfile.module.css'

export function UserProfile({userData}: UserProfileProps) {
    return (
        <section className={styles.userDetailsWrapper}>
            <div className={styles.userDetailsRow}>
                <img
                    src={userData.avatar_url}
                    alt={`${userData.login} avatar`}
                    className={styles.avatar}
                />
                <h3>{userData.name || userData.login}</h3>    
            </div>
            <div className={styles.userDetailsRow}>
                <span>
                    Followers: {userData.followers}
                </span>
                <span>
                    Following: {userData.following}
                </span>
            </div>
            <div>
                View on Github: {" "}
                <a 
                    href={userData.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.githubLink}
                    aria-label={`View ${userData.name || userData.login}'s profile on Github (opens in new tab)`}
                >
                    @{userData.login}
                </a>
            </div>
        </section>
    )
}