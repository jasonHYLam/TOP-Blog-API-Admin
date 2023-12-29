import { Link } from "react-router-dom"
export function Header() {
    return (
        <>
            <header>
                <Link to={'/posts'}>All Posts</Link>
                <Link to={'create-post'}>Create Post</Link>
            </header>
        </>
    )
}