import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'

import Card from '../components/Card';
import Layout from "../components/Layout";


export default function CaseStudy() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error } = await supabase.from('posts').select('*')
                if(error) throw error
                setPosts(data)
            } catch(error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])
    return (
        <Layout>
            <div className="py-6 md:py-16">
                <p className="text-amber-500 text-sm font-mono mb-4">Case Studies</p>
                <h1 className="text-4xl font-bold text-white mb-10">Engineering decisions. In public.</h1>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {posts
                        .slice()
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .map((post) => (
                            <Card key={post.id} url="case-studies" id={post.id} slug={post.slug} imgUrl={post.imgurl} name={post.title} desc={post.content} timestamp={post.created_at} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}