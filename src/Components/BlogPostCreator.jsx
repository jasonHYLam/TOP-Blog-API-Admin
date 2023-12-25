import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';


// BlogPostCreator takes two props, title and blogContent. These are used to populate the form 
// with existing values if the user decides to edit a post.
// title is handled by React-Hook-Form defaultValues object.
// blogContent is handled by the TinyMCE editor's initialValue 
export function BlogPostCreator({title='', blogContent=null}) {

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

    function onSubmit() {
        console.log('calling onSubmit in BlogPostCreator')
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
                initialValue={blogContent}
                />

                <button type='submit'>Submit</button>
            </Form>
        </>
    )
}