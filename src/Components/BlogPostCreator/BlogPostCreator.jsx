import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';

// BlogPostCreator takes several props, including title and blogContent. These are used to populate the form 
// with existing values if the user decides to edit a post.
// title is handled by React-Hook-Form defaultValues object.
// blogContent is handled by the TinyMCE editor's initialValue

// action is used to determine which function to use (either for editing or creating post)
export function BlogPostCreator({title='', blogContent=null, handleAction, postid=''}) {

    // formContent is obtained from React-Hook-Form, which allows access to the title input.
    // the blogContent is obtained using react state, and the handleUpdate function which allows access to TinyMCE's content.
    async function submitFormData(formContent) {

    // In order to submit the title and TinyMCE together:
    // obtain the title value from the JSON object, and create a new JSON object containing both title and TinyMCE content.
        const data = (JSON.stringify({
            "title": formContent.title, 
            "content": currentContent,
        }))

        handleAction(data)
    }

    const { register, formState: {errors}, handleSubmit } = useForm({
        defaultValues: {title: title}
    });

    const navigate = useNavigate();
    const [ currentContent, setCurrentContent ] = useState('');

    const handleUpdate = (value, editor) => {
        setCurrentContent(value);
    }

    return (
        <>
            <Form method='POST' action='/create-post' onSubmit={handleSubmit(submitFormData)}>
                <label htmlFor="title">Title</label>
                <input type="text"
                {...register('title')}
                />

                <Editor
                apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
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