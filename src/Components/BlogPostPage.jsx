import { useLoaderData, useParams } from "react-router-dom"
import parse from 'html-react-parser';
import { useState } from "react";

// Called before the BlogPostPage component renders.
// Loader functions somehow have access to the params object.
export async function blogPostPageLoader({params}) {
    const response = await fetch(`http://localhost:3000/admin_blog_post/${params.postid}`, {
        credentials: 'include',
    })
    const data = await response.json()
    return data
}

// html-react-parser is used to parse the HTML content into React elements.
export function BlogPostPage() {

    const { blogPost, comments } = useLoaderData();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmPublish, setConfirmPublish] = useState(false);
    const [confirmEdit, setConfirmEdit] = useState(false);
    
    function handleDeleteButtonClick() {
        if (!confirmDelete) setConfirmDelete(true);
        console.log(`confirmDelete status: ${confirmDelete}`)
    }

    function handlePublishButtonClick() {
        if (!confirmPublish) setConfirmPublish(true);
        console.log(`confirmPublish status: ${confirmPublish}`)
    }

    function handleEditButtonClick() {
        if (!confirmEdit) setConfirmEdit(true);
        console.log(`confirmEdit status: ${confirmEdit}`)
    }


    function handleCancelButtonClick() {
        if (confirmDelete) setConfirmDelete(false);
        else if (confirmPublish) setConfirmPublish(false);
    }

    // i probably need to put these modals in a separate component

    // this multiple ternary operator is hellish

    return (
        <>
        <button onClick={handleDeleteButtonClick}>Delete</button>
        <button onClick={handlePublishButtonClick}>Publish</button>
        <button onClick={handleEditButtonClick}>Edit</button>

        {confirmDelete ? 
        <section>
            <p>Are you sure you want to delete?</p>
            <button>Yes</button>
            <button onClick={handleCancelButtonClick}>Cancel</button>
        </section> 

        : confirmPublish ?

        <section>
            <p>Are you sure you want to publish?</p>
            <button>Yes</button>
            <button onClick={handleCancelButtonClick}>Cancel</button>
        </section> 

        : confirmEdit ?
        // this needs to be different/ need to hide the blogcontent, and show the editor. maybe i need to create a new route...
        null

        : null
        }

        <section>
            <section>
                <section>
                    <h1>{blogPost.title}</h1>
                    <p>by {blogPost.author.username}</p>
                </section>
                <hr />
                <section>
                    {parse(blogPost.content)}
                </section>
            </section>
            <hr />
            <section>
                <h2>Comments</h2>
            </section>
        </section>
        </>
    )
}