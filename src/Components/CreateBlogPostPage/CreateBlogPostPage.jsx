import { useNavigate } from 'react-router-dom';
import { BlogPostCreator } from '../BlogPostCreator/BlogPostCreator';
import { useEffect } from 'react';

export function CreateBlogPostPage() {

    const [ isAdminLoggedIn, setIsAdminLoggedIn  ] = useOutletContext();
    const navigate = useNavigate();
    const [ isLoaded, setIsLoaded ] = useState(false);

    useEffect(() => {

        if (!isAdminLoggedIn) {
            navigate('/login')
        }

        setIsLoaded(true);

    });
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
        !isLoaded ? <p>Loading</p> :
        <>
            <main>
                <h1>Create a Blog Post</h1>
                <BlogPostCreator handleAction={handleConfirmCreate}/>
            </main>
        </>
    )

}