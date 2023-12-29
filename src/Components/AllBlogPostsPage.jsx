import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom"

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
        allBlogPosts.map(post => {
            return (
                <>
                <Link key={post._id} to={`/posts/${post._id}`}>
                    <section>
                        <p>{post.title}</p>
                        <p> by {post.author.username}</p>
                        {post.published_status ? <p>published</p> : <p>unpublished</p>}
                        <p>created {post.date}</p>
                    </section>
                </Link>
                </>
            )
        })
        }
        
        </>
    )
}