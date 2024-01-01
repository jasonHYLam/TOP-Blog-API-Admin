import styles from './Comment.module.css';

export function Comment({comment}) {
    return (
        <>
            <article className={styles.comment}>
                <p>{comment.author.username}</p>
                <p>{comment.text}</p>
                <p>{comment.timeStampFormatted}</p>
            </article>
        </>
    )
}