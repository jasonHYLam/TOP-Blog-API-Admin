import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header";
import styles from './ParentComponent.module.css';

// I believe that when change is made, that rerenders ParentComponent.
export function ParentComponent() {

    const [ isParentLoaded, setIsParentLoaded ] = useState(false);

    useEffect(() => {
        setIsParentLoaded(true)
    },
    []
    )

    return (
        !isParentLoaded ? <p>Loading...</p> : 
        <>
        <Header/>
        <main className={styles.outletWrapper}>
            <Outlet/>
        </main>
        </>
    )

}