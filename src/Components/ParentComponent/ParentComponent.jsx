import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header";

// I believe that when change is made, that rerenders ParentComponent.
export function ParentComponent() {

    const [ isParentLoaded, setIsParentLoaded ] = useState(false);

    useEffect(() => {
        console.log('check if parent useEffect is called')
        setIsParentLoaded(true)
    },
    []
    )

    return (
        !isParentLoaded ? <p>Loading...</p> : 
        <>
        <Header/>
        <Outlet/>
        </>
    )

}