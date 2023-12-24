import { useParams } from "react-router-dom"
export async function blogPostPageLoader({params}) {
    console.log('checking out params from the loader')
    console.log(params)
    console.log('before fetch')
    const response = await fetch(`http://localhost:3000/admin_blog_post${params}`, {
        credentials: 'include',
    })
    console.log('after fetch')
    console.log('checking out response')
    console.log(response)
    return response
}
export function BlogPostPage() {
    const postId = useParams();

    console.log('checking out the params from the component')
    console.log(postId)
    
    return (
        <>
        <section>
            <p>Let's see some</p>
        </section>
        </>
    )
}