import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import { BlogPostCreator } from "../BlogPostCreator/BlogPostCreator";
import { CommentForm } from "../CommentForm/CommentForm";
import { Post } from "../Post/Post";
import { Comment } from "../Comment/Comment";

// html-react-parser is used to parse the HTML content into React elements.
export function BlogPostPage() {

    const [ blogPost, setBlogPost ] = useState({});
    const [ comments , setComments ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);

    const {postid} = useParams();

    const [currentStatus, setCurrentStatus] = useState('')
    // isChangeSubmitted is used to determine whether useEffect callback is called, as it is in the dependency array.
    const [ isChangeSubmitted, setIsChangeSubmitted ] = useState(false)
    const navigate = useNavigate();
    const oppositeOfPublishedStatus = blogPost.published_status === true ? 'Unpublish' : 'Publish';

    useEffect( () => {
        async function blogPostPageLoader() {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin_blog_post/${postid}`, {
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
        fetch(`${import.meta.env.VITE_BACKEND_URL}/admin_blog_post/${postid}/delete_post`, {
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
        fetch(`${import.meta.env.VITE_BACKEND_URL}/admin_blog_post/${postid}/change_publish`, {
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
        fetch(`${import.meta.env.VITE_BACKEND_URL}/admin_blog_post/${postid}`, {
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
            <Post blogPost={blogPost}/>
            <hr />
            <section>
                <CommentForm setIsChangeSubmitted={setIsChangeSubmitted}/>
                <h2>Comments</h2>
                {!comments.length ? <p>No comments. Write a comment?</p> : 
                comments.map(comment => {
                    return (
                        <Comment key={comment._id} comment={comment}/>
                    )
                })
                }
            </section>
        </section>
        
    }

        </>
    )
}