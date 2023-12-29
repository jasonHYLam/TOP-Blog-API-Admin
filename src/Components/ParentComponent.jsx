import { useEffect } from "react";
import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export function ParentComponent() {
    const navigate = useNavigate()


    const [ isParentLoaded, setIsParentLoaded ] = useState(false);
    const [ isParentChangeSubmitted, setIsParentChangeSubmitted ] = useState(false);

    useEffect(() => {
        console.log('check if parent useEffect is called')
        setIsParentLoaded(true)
        // to reset isChangeSubmitted
        // setIsParentChangeSubmitted(false)
    },
    // [isParentChangeSubmitted]
    []
    )
    // what i am hoping is that when i submit a change, everything will rerender
    // because the parent will rerender. 
    // and hopefully the children will also rerender.

    return (
        !isParentLoaded ? <p>Loading...</p> : 
        <>
        <p>po</p>
        {/* <Outlet context={[isParentChangeSubmitted, setIsParentChangeSubmitted]}/> */}
        <Outlet/>
        </>
    )

}