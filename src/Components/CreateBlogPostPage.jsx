import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';



export function CreateBlogPostPage() {

    const { register, formState: {errors}, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [ text, setText ] = useState('');

    const handleUpdate = (value, editor) => {
        setText(value);
    }

    // This makes use of TinyMCE and a separate input for the title.
    // The TinyMCE content is obtained through the state hook.
    // React-Hook-Form is being used, and as such, handleSubmit is used to obtain form data (in this case title input)
    // In order to submit the title and TinyMCE together:
    // obtain the title value from the JSON object, and create a new JSON object containing both title and TinyMCE content.
    async function onSubmit(titleObject) {

        const data = (JSON.stringify({
            "title": titleObject.title, 
            "content": text
        }))

        console.log('before fetch')
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

                <Form method='POST' action='/create-post' onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="title">Title</label>
                    <input type="text"
                    {...register('title')}
                    />

                    <Editor
                    apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
                    textareaName='blog-post-content'
                    init={{
                        plugins: 'link lists'
                    }}
                    onEditorChange={handleUpdate}
                    />

                    <button type='submit'>Submit</button>
                </Form>
            </main>
        </>
    )

}