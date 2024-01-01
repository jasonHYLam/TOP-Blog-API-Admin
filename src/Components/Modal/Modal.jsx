export function Modal({action, handleAction, handleCancel}) {
    return (
        <>
        <section>
            <p>Are you sure you want to {action}?</p>
            <button onClick={handleAction}>Yes</button>
            <button onClick={handleCancel}>Cancel</button>
        </section>
        </>
    )
}