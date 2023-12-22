import { useLoaderData } from "react-router-dom"

export async function allBlogPostsLoader() {
    console.log('attempting all fetch')
    return await fetch('http://localhost:3000/home', {
        // I may need to pass JWT for this?
    })
    .then(res => res.json())

}

export function AllBlogPostsPage() {

    const { allPosts } = useLoaderData();
    console.log(allPosts)

    return (
        <>
        <p>All posts</p>
        
        </>
    )
}