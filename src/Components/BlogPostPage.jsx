import { useNavigate, useParams } from "react-router-dom"
import parse from 'html-react-parser';
import { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";
import { BlogPostCreator } from "./BlogPostCreator";

import { useOutletContext } from "react-router-dom";
import { CommentForm } from "./CommentForm";

// html-react-parser is used to parse the HTML content into React elements.
export function BlogPostPage() {

    // OutletContext is used to set parent state, which triggers rerender of child and calls useEffect callback, 
    // which updates component with fresh data.

    // disable this and all references
    // const [ isParentChangeSubmitted, setIsParentChangeSubmitted ] = useOutletContext();
    // console.log('checking what ParentIsChangeSubmitted is')
    // console.log(isParentChangeSubmitted)

    const [ blogPost, setBlogPost ] = useState({});
    const [ comments , setComments ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);

    console.log('checking out comments')
    console.log(comments)

    const {postid} = useParams();

    const [currentStatus, setCurrentStatus] = useState('')
    // isChangeSubmitted is used to determine whether useEffect callback is called, as it is in the dependency array.
    const [ isChangeSubmitted, setIsChangeSubmitted ] = useState(false)
    const navigate = useNavigate();
    const oppositeOfPublishedStatus = blogPost.published_status === true ? 'Unpublish' : 'Publish';

    useEffect( () => {
        console.log('checking out if blogPostPageLoader useEffect is called')
        async function blogPostPageLoader() {

        const response = await fetch(`http://localhost:3000/admin_blog_post/${postid}`, {
            credentials: 'include',
        })
        const { blogPost, comments } = await response.json()

        setIsLoaded(true);
        setBlogPost(blogPost);
        setComments(comments);
        
        // this will eventually stop rerenders.
        setIsChangeSubmitted(false)
        }
        blogPostPageLoader()
    }, 
    [isLoaded, postid, isChangeSubmitted]
    )

    function handleDeleteButtonClick() {
        if (currentStatus !== 'delete') setCurrentStatus('delete');
    }

    function handlePublishButtonClick() {
        if (currentStatus !== 'publish') setCurrentStatus('publish');
    }

    function handleEditButtonClick() {
        if (currentStatus !== 'edit') setCurrentStatus('edit');
    }


    function handleCancelButtonClick() {
        if (currentStatus !== '') setCurrentStatus('');
    }

    async function handleConfirmDeletePost() {
        fetch(`http://localhost:3000/admin_blog_post/${postid}/delete_post`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
            credentials: 'include',
        })
        setIsChangeSubmitted(true);
        setCurrentStatus('');
        navigate('/posts')
    }

    async function handleConfirmPublish() {
        fetch(`http://localhost:3000/admin_blog_post/${postid}/change_publish`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            credentials: 'include',
        })
        setIsChangeSubmitted(true);
        setCurrentStatus('');
    }

    async function handleConfirmEditPost(data) {
        fetch(`http://localhost:3000/admin_blog_post/${postid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            body: data,
            credentials: 'include',
        })
        setIsChangeSubmitted(true);
        setCurrentStatus('');
    }




    return (
        !isLoaded ? <p>Loading</p> : 
        <>
        <button onClick={handleDeleteButtonClick}>Delete</button>
        <button onClick={handlePublishButtonClick}>{oppositeOfPublishedStatus}</button>
        <button onClick={handleEditButtonClick}>Edit</button>

        {// Show delete/publish/edit modals depending on current status of Page component, using ternary operator.
        currentStatus === 'delete' ? <Modal action={'delete'} handleAction={handleConfirmDeletePost} handleCancel={handleCancelButtonClick}></Modal>

        : currentStatus === 'publish' ?  <Modal action={oppositeOfPublishedStatus.toLowerCase()} handleAction={handleConfirmPublish} handleCancel={handleCancelButtonClick}></Modal>

        : null
        }

        { 
        // If currentStatus is true, then show the TinyMCE editor. Otherwise show the content.
        currentStatus === 'edit' ? 
        <>
        <p>Currently editing:</p>
        <BlogPostCreator title={blogPost.title} blogContent={blogPost.content} handleAction={handleConfirmEditPost} postid={postid}/>

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
                {!comments.length ? <p>No comments. Write a comment?</p> : 
                comments.map(comment => {
                    return (
                        <>
                        <p>comment.</p>
                        </>
                    )
                })
                }
                <CommentForm siteRequest={'admin'} setIsChangeSubmitted={setIsChangeSubmitted}/>
            </section>
        </section>
        
    }

        </>
    )
}