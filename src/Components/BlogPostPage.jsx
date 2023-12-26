import { useLoaderData, useParams } from "react-router-dom"
import parse from 'html-react-parser';
import { useState } from "react";
import { Modal } from "./Modal";
import { BlogPostCreator } from "./BlogPostCreator";

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


    const {postid} = useParams();

    const { blogPost, comments } = useLoaderData();
    const [currentStatus, setCurrentStatus] = useState('')
    const oppositeOfPublishedStatus = blogPost.published_status === true ? 'Unpublish' : 'Publish';

    console.log('checking out published status')
    console.log(blogPost)
    console.log(blogPost.published_status)


    console.log('checking out oppositeOfPublishedStatus')
    console.log(oppositeOfPublishedStatus)


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
        console.log(JSON.stringify(blogPost.content))
        console.log(`currentStatus status: ${currentStatus}`)
    }


    function handleCancelButtonClick() {
        if (currentStatus !== '') setCurrentStatus('');
    }

    function handleConfirmDelete() {
        // i want to test this last
        fetch(`http://localhost:3000/admin_blog_post/${postid}/delete_post`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
            credentials: 'include',
        })
    }

    function handleConfirmPublish() {
        // this shouldn't be too difficult. actually it might be. 
        // need to send the publish status
        fetch(`http://localhost:3000/admin_blog_post/${postid}/change_publish`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            credentials: 'include',
        })
    }


    return (
        <>
        <button onClick={handleDeleteButtonClick}>Delete</button>
        <button onClick={handlePublishButtonClick}>{oppositeOfPublishedStatus}</button>
        <button onClick={handleEditButtonClick}>Edit</button>

        {// Show delete/publish/edit modals depending on current status of Page component, using ternary operator.
        currentStatus === 'delete' ? <Modal action={'delete'} handleAction={handleConfirmDelete} handleCancel={handleCancelButtonClick}></Modal>

        : currentStatus === 'publish' ?  <Modal action={oppositeOfPublishedStatus.toLowerCase()} handleAction={handleConfirmPublish} handleCancel={handleCancelButtonClick}></Modal>

        : null
        }

        { 
        // If currentStatus is true, then show the TinyMCE editor. Otherwise show the content.
        currentStatus === 'edit' ? 
        <>
        <p>Currently editing:</p>
        <BlogPostCreator title={blogPost.title} blogContent={blogPost.content} action={'edit'} postid={postid}/>

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