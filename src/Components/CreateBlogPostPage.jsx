import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';
import { BlogPostCreator } from './BlogPostCreator';



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
        console.log('seeing if fetch finishes')
        navigate('/posts')
        console.log('seeing if navigate occurs')
        // see if the new post is displayed on allPosts. I don't think it will be because
        // there is no way that parent state is affected by this.
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