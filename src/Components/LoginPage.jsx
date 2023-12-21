import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate, Form } from "react-router-dom";

export function LoginPage() {

    const { register, formState: {errors}, handleSubmit } = useForm();
    const [ backendError, setBackendError ] = useState('')
    const navigate = useNavigate()
    return (
        <>
        <main>
            <Form>
                <label htmlFor="username">Username</label>
                <input type="text" 
                {...register('username', {
                    required: 'Username is required',
                })}/>
                <p>{errors.username?.message}</p>

                <label htmlFor="password">Password</label>
                <input type="text" 
                {...register('password', {
                    required: 'Password is required',
                })}/>
                <p>{errors.password?.message}</p>

                <button type="submit">Login</button>
            </Form>
        </main>
        </>
    )
}