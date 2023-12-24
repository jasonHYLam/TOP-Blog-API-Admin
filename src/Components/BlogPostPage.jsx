import { useLoaderData, useParams } from "react-router-dom"
import parse from 'html-react-parser';
import { useState } from "react";
import { Modal } from "./Modal";

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
    const [deleteStatus, setDeleteStatus] = useState(false);
    const [publishStatus, setPublishStatus] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    
    function handleDeleteButtonClick() {
        if (!deleteStatus) setDeleteStatus(true);
        console.log(`deleteStatus status: ${deleteStatus}`)
    }

    function handlePublishButtonClick() {
        if (!publishStatus) setPublishStatus(true);
        console.log(`publishStatus status: ${publishStatus}`)
    }

    function handleEditButtonClick() {
        if (!editStatus) setEditStatus(true);
        console.log(`editStatus status: ${editStatus}`)
    }


    function handleCancelButtonClick() {
        if (deleteStatus) setDeleteStatus(false);
        else if (publishStatus) setPublishStatus(false);
    }

    function handleConfirmDelete() {
    }

    function handleConfirmPublish() {
    }

    function handleConfirmEdit() {
    }

    // i probably need to put these modals in a separate component

    // this multiple ternary operator is hellish

    return (
        <>
        <button onClick={handleDeleteButtonClick}>Delete</button>
        <button onClick={handlePublishButtonClick}>Publish</button>
        <button onClick={handleEditButtonClick}>Edit</button>

        {/* show Modal if  */}
        {deleteStatus ? 
        <Modal action={'delete'} handleAction={handleConfirmDelete} handleCancel={handleCancelButtonClick}></Modal>

        : publishStatus ? 
        <Modal action={'publish'} handleAction={handleConfirmPublish} handleCancel={handleCancelButtonClick}></Modal>

        : editStatus ?
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