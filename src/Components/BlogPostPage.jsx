import { useLoaderData, useParams } from "react-router-dom"
import parse from 'html-react-parser';

export async function blogPostPageLoader({params}) {
    console.log('checking out params from the loader')
    console.log(params)
    console.log('before fetch')
    const response = await fetch(`http://localhost:3000/admin_blog_post/${params.postid}`, {
        credentials: 'include',
    })
    const data = await response.json()
    console.log('after fetch')
    console.log('checking out data')
    console.log(data)
    return data
}

export function BlogPostPage() {

    const { blogPost, comments } = useLoaderData()
    console.log('checking out blogPost')
    console.log(blogPost)
    
    console.log('checking out comments')
    console.log(comments)
    // i need to parse the HTML somehow

    // maybe react html parser is what i need

    console.log('checking out blogPost content before parsing')
    console.log(blogPost.content)
    console.log('checking out blogPost content after parsing')
    console.log(parse(blogPost.content))
    
    return (
        <>
        <button>Delete</button>
        <button>Publish</button>
        <button>Edit</button>
        <section>
            <h1>{blogPost.title}</h1>

            {parse(blogPost.content)}

            
        </section>
        </>
    )
}