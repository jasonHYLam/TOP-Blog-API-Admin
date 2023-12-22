import { Editor } from '@tinymce/tinymce-react';
console.log(import.meta.env.VITE_TINY_MCE_API_KEY )

export function CreateBlogPostPage() {
    return (
        <>
            <main>
                <h1>Create a Blog Post</h1>
                <Editor
                apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
                
                />
            </main>
        </>
    )

}