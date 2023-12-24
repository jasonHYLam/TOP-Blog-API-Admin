import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';

export function BlogPostCreator({title='hi', blogContent=null}) {

    const { register, formState: {errors}, handleSubmit } = useForm({
        defaultValues: {
            title: title
        }
    });
    const navigate = useNavigate();
    const [ text, setText ] = useState('');

    const handleUpdate = (value, editor) => {
        setText(value);
    }

    return (
        <>
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
        </>
    )
}