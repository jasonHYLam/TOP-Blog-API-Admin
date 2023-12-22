import { Editor } from '@tinymce/tinymce-react';
import { Form } from 'react-router-dom';

export function CreateBlogPostPage() {
    // hm. how to handle submit...

    // create fetch?
    async function onSubmit(data) {
        await fetch('http://localhost:3000/login_admin')

    }

    return (
        <>
            <main>
                <h1>Create a Blog Post</h1>

                <Form method='POST' onSubmit={}>
                    <label htmlFor="title">Title</label>
                    <input name='title' type="text" />

                    <Editor
                    apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
                    init={{
                        plugins: 'link lists'
                    }}
                    />
                    <button >Submit</button>
                </Form>
            </main>
        </>
    )

}