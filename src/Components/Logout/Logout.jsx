import { useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"

export function Logout() {

    const navigate = useNavigate();
    const [ isAdminLoggedIn, setIsAdminLoggedIn ] = useOutletContext();

    useEffect(() => {

        async function logout() {
            fetch('http://localhost:3000/logout', {credentials: "include"})
            setIsAdminLoggedIn(false)
        }
        logout()
        navigate('/login')
    },
    [navigate, setIsUserLoggedIn]
    )

    return (
        <>
        <p>Prepare for logout</p>
        </>
    )
}