import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import Card from '../components/Card';
import Layout from "../components/Layout";


export default function CaseStudy() {
    return (
        <Layout>
            <div className="py-16">
                <p className="text-amber-500 text-sm font-mono mb-4">Case Studies</p>
                <h1 className="text-4xl font-bold text-white mb-10">Engineering decisions. In public.</h1>
                <div className="grid grid-cols-3 gap-4">
                    {posts
                        .slice()
                        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                        .map((post) => (
                            <Card key={post.id} url="case-studies" id={post.id} slug={post.slug} imgUrl={post.imgUrl} name={post.title} desc={post.desc} timestamp={post.timestamp} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}