import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';
import { BlogPostCreator } from './BlogPostCreator';



export function CreateBlogPostPage() {

    return (
        <>
            <main>
                <h1>Create a Blog Post</h1>
                <BlogPostCreator action={'create'}/>
            </main>
        </>
    )

}