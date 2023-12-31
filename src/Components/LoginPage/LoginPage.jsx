import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate, Form, useOutletContext } from "react-router-dom";

export function LoginPage() {

    const { register, formState: {errors}, handleSubmit } = useForm();
    const [ backendError, setBackendError ] = useState('')
    const navigate = useNavigate()
    const [ isAdminLoggedIn, setIsAdminLoggedIn  ] = useOutletContext();


    const onSubmit = async (data) => {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/login_admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true
                },
                body: JSON.stringify(data),
                credentials: 'include',
        })
        .then(res => res.json())
        .then(res => {
            if (res.success === false ) setBackendError(res.message)

            else {
                console.log('a most incredible success')
                console.log(res)
                setIsAdminLoggedIn(true)
                navigate('/posts');
            }
        })

    }
    return (
        <>
        <main>
            <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Username</label>
                <input type="text" 
                {...register('username', {
                    required: 'Username is required',
                })}/>
                <p>{errors.username?.message}</p>

                <label htmlFor="password">Password</label>
                <input type="password" 
                {...register('password', {
                    required: 'Password is required',
                })}/>
                <p>{errors.password?.message}</p>
                {backendError !== "" ? <p>{backendError}</p> : null}

                <button type="submit">Login</button>
            </Form>
        </main>
        </>
    )
}