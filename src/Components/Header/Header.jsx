import styles from './Header.module.css';

import { Link } from "react-router-dom"
export function Header() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.linksGroup}>

                    <Link className={styles.headerText} to={'/posts'}>All Posts</Link>
                    <Link className={styles.headerText} to={'create-post'}>Create Post</Link>

                </div>
            </header>
        </>
    )
}