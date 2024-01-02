import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { Header } from "../Header/Header";
import styles from './ParentComponent.module.css';

// I believe that when change is made, that rerenders ParentComponent.
export function ParentComponent() {

    const navigate = useNavigate();

    const [ isParentLoaded, setIsParentLoaded ] = useState(false);
    const [ isAdminLoggedIn, setIsAdminLoggedIn ] = useState(false);

    useEffect(() => {
        setIsParentLoaded(true)
        // navigate('/posts')
        // make a fetch request, see if user exists, if so, render Outlet, if not, navigate to... but wait... i can't do it here, i need to go one layer deeper i think
        async function checkIfLoggedIn() {
            console.log('before fetch')

            const response = await fetch('http://localhost:3000/get_admin_user', {
                credentials: 'include'
            })
            // const { user } = await response.json();

            // console.log('checking if user exsits');
            // console.log(user)
            console.log('before fetch')

            if (!response.ok) console.log('authorization failed. login maybe?')
            else {
                console.log(response)
                const data = await response.json();
                console.log('checking response data')
                console.log(data)
            }
        }
        checkIfLoggedIn();
    },
    []
    )

    return (
        !isParentLoaded ? <p>Loading...</p> : 
        <>
        <Header/>
        <main className={styles.outletWrapper}>
            <Outlet context={[ isAdminLoggedIn, setIsAdminLoggedIn ]}/>
        </main>
        </>
    )

}