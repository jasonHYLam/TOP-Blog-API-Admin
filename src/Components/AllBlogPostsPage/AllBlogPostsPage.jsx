import { PostPreview } from "../PostPreview/PostPreview";
import { useEffect, useState } from "react";
import styles from './AllBlogPostsPage.module.css'
import { useNavigate, useOutletContext } from "react-router-dom";

export function AllBlogPostsPage() {
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ allBlogPosts, setAllBlogPosts ] = useState([]);
    const [ user, setUser ] = useState({});
    const [ isAdminLoggedIn, setIsAdminLoggedIn  ] = useOutletContext();
    const navigate = useNavigate();

    // credentials: 'include' is necessary for passing JWT to the server in order for authorization.
    useEffect(() => {

        console.log('checking isAdminLoggedIn')
        console.log(isAdminLoggedIn)
        if (!isAdminLoggedIn) {
            navigate('/login')
        }

        async function allBlogPostsLoader() {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin_all_posts`, {
                credentials: "include"
            })
            const { allPosts, user } = await response.json()

            setIsLoaded(true);
            setAllBlogPosts(allPosts);
            setUser(user);
        }
        allBlogPostsLoader()
    },
    []
    );

    return (
        !isLoaded ? <p>Loading</p> :
        <>
            <p>All posts</p>
            <p>Welcome back {user.username}</p>

            {(!allBlogPosts.length) ? <p>No posts. Create a post?</p> 
            :

            <section className={styles.postsGroup}>

                {allBlogPosts.map(post => {
                    return (
                        <PostPreview key={post._id} post={post} />
                    )
                })
                }

            </section>
            }
        
        </>
    )
}