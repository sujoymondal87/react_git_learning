import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import Card from '../components/Card';


export default function CaseStudy() {
    return (
        <section className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold py-4">Case Studies</h2>
            <div className="grid grid-cols-3 gap-4">
                {posts
                    .slice()
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .map((post) => (
                        <Card key={post.id} url="case-studies" id={post.id} slug={post.slug} imgUrl={post.imgUrl} name={post.title} desc={post.desc} timestamp={post.timestamp} />
                ))}
            </div>
        </section>
    )
}