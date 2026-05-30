import { posts } from '../data/posts';
import Card from './Card';
import { Link } from 'react-router-dom';

export default function CaseStudy() {
    return (
        <section className="py-16">
            <p className="text-amber-500 text-sm font-mono mb-4">03 / Case Studies</p>
            <h2 className="text-3xl font-bold text-white mb-10">Engineering decisions. In public.</h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
                {posts
                    .slice()
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .slice(0, 3)
                    .map((post) => (
                        <Card key={post.id} url="case-studies" id={post.id} slug={post.slug} imgUrl={post.imgUrl} name={post.title} desc={post.desc} timestamp={post.timestamp} />
                ))}
            </div>
            <Link to="/case-studies" className="text-amber-500 text-sm font-mono hover:underline">
                View all case studies →
            </Link>
        </section>
    )
}