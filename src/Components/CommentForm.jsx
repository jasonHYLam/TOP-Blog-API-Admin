import { useForm } from "react-hook-form"
import { Form, useParams } from "react-router-dom"
export function CommentForm({siteRequest, setIsChangeSubmitted}) {

    const { postid } = useParams();
    const { register, formState: {errors}, handleSubmit } = useForm();

    let routeForFetch = '';
    if (siteRequest === 'admin') {routeForFetch = 'admin_blog_post'} 
    else if (siteRequest === 'public') {routeForFetch = 'home'}

    const onSubmit = async (data) => {
        console.log('checking out params')
        console.log(postid)

        console.log('checking out data to post')
        console.log(data)

        console.log('before fetch')
        fetch(`http://localhost:3000/${routeForFetch}/${postid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(data),
            credentials: 'include',
        })
        console.log('after fetch')
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