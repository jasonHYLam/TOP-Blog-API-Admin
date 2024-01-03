import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { Header } from "../Header/Header";
import styles from './ParentComponent.module.css';

// I believe that when change is made, that rerenders ParentComponent.
// isAdminLoggedIn is passed as OutletContext such that when accessing a page component, the page redirects to login or renders the component.
export function ParentComponent() {

    const [ isParentLoaded, setIsParentLoaded ] = useState(false);
    const [ isAdminLoggedIn, setIsAdminLoggedIn ] = useState(false);

    useEffect(() => {
        setIsParentLoaded(true)
        // make a fetch request, see if user exists. 
        // If not successful, return (isAdminLoggedIn remains false and attempts to access other frontend routes will cause redirect to the login page).
        // If successful, isAdminLoggedIn is set to true, and will allow access to other routes.
        async function checkIfLoggedIn() {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get_admin_user`, {
                credentials: 'include'
            })

            if (!response.ok) return;
            else {
                const { user } = await response.json();
                if (user) {
                    setIsAdminLoggedIn(true)
                }
            }
        }
        checkIfLoggedIn();
    },
    [isAdminLoggedIn]
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