import { PostPreview } from "../PostPreview/PostPreview";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import styles from './AllBlogPostsPage.module.css'

export function AllBlogPostsPage() {

    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ allBlogPosts, setAllBlogPosts ] = useState([]);
    const [ user, setUser ] = useState({});

    // what is this for?
    const [ isChangedSubmitted, setIsChangeSubmitted] = useState(false);

    useEffect(() => {
        async function allBlogPostsLoader() {
            console.log('attempting all fetch')
            const response = await fetch('http://localhost:3000/admin_all_posts', {
                // I may need to pass JWT for this?
                credentials: "include"
            })
            const { allPosts, user } = await response.json()
            console.log('checking out allPosts');
            console.log(allPosts);

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

        {(!allBlogPosts.length) ? <p>No posts. Create a post?</p> 
        :

        <section className={styles.postsGroup}>

            {allBlogPosts.map(post => {
                return (
                    <>
                    <PostPreview key={post._id} post={post} />
                    </>
                )
            })
            }

        </section>
        }
        
        </>
    )
}