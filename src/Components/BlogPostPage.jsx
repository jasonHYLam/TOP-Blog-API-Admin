import { useLoaderData, useParams } from "react-router-dom"
import parse from 'html-react-parser';

// Called before the BlogPostPage component renders.
// Loader functions somehow have access to the params object.
export async function blogPostPageLoader({params}) {
    const response = await fetch(`http://localhost:3000/admin_blog_post/${params.postid}`, {
        credentials: 'include',
    })
    const data = await response.json()
    return data
}

// html-react-parser is used to parse the HTML content into React elements.
export function BlogPostPage() {

    const { blogPost, comments } = useLoaderData()
    
    return (
        <>
        <button>Delete</button>
        <button>Publish</button>
        <button>Edit</button>
        <section>
            <section>
                <h1>{blogPost.title}</h1>
                <p>{}</p>
                {parse(blogPost.content)}
            </section>
            <hr />
            <section>
                <h2>Comments</h2>
            </section>
        </section>
        </>
    )
}