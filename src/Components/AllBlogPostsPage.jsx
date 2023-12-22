import { useLoaderData } from "react-router-dom"

export async function allBlogPostsLoader() {
    console.log('attempting all fetch')
    return await fetch('http://localhost:3000/admin_all_posts', {
        // I may need to pass JWT for this?
        credentials: "include"
    })
    .then(res => res.json())

}

// i should probably use the User object... should i redirect? perhaps in the loader function?

export function AllBlogPostsPage() {

    const { allPosts, user } = useLoaderData();
    console.log(allPosts)
    console.log(`checking user:`)
    console.log(user)

    return (
        <>
        <p>All posts</p>

        {(!allPosts.length) ? <p>No posts. Create a post?</p> 
        :
        allPosts.map(post => {
            <p>heh</p>
        })
        }
        
        </>
    )
}