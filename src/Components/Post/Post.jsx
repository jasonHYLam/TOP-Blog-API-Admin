import parse from 'html-react-parser';
import styles from './Post.module.css';

export function Post({blogPost}) {
    return (
        <>
        
            <section>
                <section>
                    <h1>{blogPost.title}</h1>
                    <p>by {blogPost.author.username}</p>
                    {blogPost.published_status ? <p>Currently published</p> : <p>Currently unpublished</p>}
                    <p>created on {blogPost.date}</p>
                    <p>created on {blogPost.dateFormatted}</p>

                </section>
                <hr />
                <section className={styles.blogPostContent}>
                    {parse(blogPost.content)}
                </section>
            </section>
        
        </>
    )
}