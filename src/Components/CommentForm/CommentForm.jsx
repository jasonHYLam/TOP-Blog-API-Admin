import { useForm } from "react-hook-form"
import { Form, useParams } from "react-router-dom"

export function CommentForm({setIsChangeSubmitted}) {

    const { postid } = useParams();
    const { register, formState: {errors}, handleSubmit, reset } = useForm();

    // Make a post request with the stringified comment object.
    // Then, reset the form and set blogPostPage state to trigger useEffect hook and rerender with new comment.
    const onSubmit = async (data) => {
        fetch(`http://localhost:3000/admin_blog_post/${postid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(data),
            credentials: 'include',
        })
        reset()
        
        setIsChangeSubmitted(true)
    }

    return (

        <>
        <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="comment">Write a comment</label>
            <textarea name="" id="" cols="30" rows="10"
            {...register('comment', {required: 'Write a comment'})}
            ></textarea>
            <button type="submit">New Comment</button>
        </Form>
        <p>{errors.comment?.message}</p>
        </>

    )
}