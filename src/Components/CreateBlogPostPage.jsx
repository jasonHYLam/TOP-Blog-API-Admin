import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';

export async function onSubmit(data) {
    await fetch('http://localhost:3000/admin_create_post',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(data),
        credentials: 'include',
    })
}

export function CreateBlogPostPage() {

    const { register, formState: {errors}, handleSubmit } = useForm();

    const [ text, setText ] = useState('');

    const handleUpdate = (value, editor) => {
        setText(value);
    }
    // hm. how to handle submit...

    // create fetch?
    async function onSubmit(title) {

        const stringifiedTitle = JSON.stringify(title)
        const stringifiedBlogPostText = JSON.stringify(text)
        const dataToPost = [
            stringifiedTitle, stringifiedBlogPostText
        ]

        console.log('checking out output')
        console.log(stringifiedTitle)
        console.log(stringifiedBlogPostText)
        await fetch('http://localhost:3000/admin_create_post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: dataToPost,
            credentials: 'include',
        })
        
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
                    init={{
                        plugins: 'link lists'
                    }}
                    // onInit={async (editor) => {
                    //     setText(editor.getContent({format: 'text'}))
                    // }}
                    onEditorChange={handleUpdate}
                    // onEditorChange={(newValue, editor) => {
                    //     setText(setText(newValue))
                    // }}
                    />

                    <button type='submit'>Submit</button>
                </Form>
            </main>
        </>
    )

}