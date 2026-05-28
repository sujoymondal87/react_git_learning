import { useParams } from 'react-router-dom';
import { posts } from '../data/posts';


export default function CaseStudiesDetails() {
    const { slug } = useParams()
    const post = posts.find((post) => post.slug === slug)
    return (
        post ? (
        <div>
            <h1>Case Studies Details</h1>
            <p>{slug}</p>
            <p>{post.title}</p>
        </div>
        ) : (
            <div>
                <h1>Case Studies not found</h1>
            </div>
        )
    )
}