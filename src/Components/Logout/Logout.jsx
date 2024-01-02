import { useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"

export function Logout() {
    console.log('checking logout component is accessed')

    const navigate = useNavigate();
    const [ isAdminLoggedIn, setIsAdminLoggedIn ] = useOutletContext();

    useEffect(() => {

        async function logout() {
            fetch('http://localhost:3000/admin_logout', {credentials: "include"})
            setIsAdminLoggedIn(false)
        }
        logout()
        navigate('/login')
    },
    [navigate, setIsAdminLoggedIn]
    )

    return (
        <>
        <p>Prepare for logout</p>
        </>
    )
}