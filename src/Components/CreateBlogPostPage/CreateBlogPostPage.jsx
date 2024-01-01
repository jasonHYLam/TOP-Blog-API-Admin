import { useNavigate } from 'react-router-dom';
import { BlogPostCreator } from '../BlogPostCreator/BlogPostCreator';

export function CreateBlogPostPage() {

    const navigate = useNavigate();

    async function handleConfirmCreate(data) {

        fetch('http://localhost:3000/admin_create_post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: data,
            credentials: 'include',
        })
        navigate('/posts')
    }
    return (
        <>
            <main>
                <h1>Create a Blog Post</h1>
                <BlogPostCreator handleAction={handleConfirmCreate}/>
            </main>
        </>
    )

}