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
    const [currentStatus, setCurrentStatus] = useState('')

    const oppositeOfPublishedStatus = blogPost.publishedStatus ? 'Unpublish' : 'Publish';

    console.log('checking blogPost publish status')
    console.log(blogPost.published_status)

    function handleDeleteButtonClick() {
        if (currentStatus !== 'delete') setCurrentStatus('delete');
        console.log(`currentStatus status: ${currentStatus}`)
    }

    function handlePublishButtonClick() {
        if (currentStatus !== 'publish') setCurrentStatus('publish');
        console.log(`currentStatus status: ${currentStatus}`)
    }

    function handleEditButtonClick() {
        if (currentStatus !== 'edit') setCurrentStatus('edit');
        console.log(`currentStatus status: ${currentStatus}`)
    }


    function handleCancelButtonClick() {
        if (currentStatus !== '') setCurrentStatus('');
    }

    function handleConfirmDelete() {
        // i want to test this last
    }

    function handleConfirmPublish() {
        // this shouldn't be too difficult. actually it might be. 
    }

    function handleConfirmEdit() {
        // currently I can see that this may have quite a few steps
        // first
    }

    // this multiple ternary operator is hellish

    return (
        <>
        <button onClick={handleDeleteButtonClick}>Delete</button>
        <button onClick={handlePublishButtonClick}>{oppositeOfPublishedStatus}</button>
        <button onClick={handleEditButtonClick}>Edit</button>

        {// Show delete/publish/edit modals depending on current status of Page component.
        currentStatus === 'delete' ? <Modal action={'delete'} handleAction={handleConfirmDelete} handleCancel={handleCancelButtonClick}></Modal>

        : currentStatus === 'publish' ?  
        
        <Modal action={oppositeOfPublishedStatus.toLowerCase()} handleAction={handleConfirmPublish} handleCancel={handleCancelButtonClick}></Modal>
        : null
        }

        { 
        // If currentStatus is true, then show the TinyMCE. Otherwise show the content.
        currentStatus === 'edit' ? 
        <>
        <p>Currently editing:</p>
        </>
        :

        <section>
            <section>
                <section>
                    <h1>{blogPost.title}</h1>
                    <p>by {blogPost.author.username}</p>
                    {blogPost.published_status ? <p>Currently published</p> : <p>Currently unpublished</p>}

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
        
    }

        </>
    )
}