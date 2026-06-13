import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import ReactMarkdown from 'react-markdown'
import SEO from '../components/SEO'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

export default function CaseStudiesDetails() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [images, setImages] = useState([])
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).single()
                if(error) throw error
                setPost(data)
                const { data: images, error: imagesError } = await supabase.from('post_images').select('*').eq('post_id', data.id).order('sort_order', { ascending: true })
                if(imagesError) throw imagesError
                setImages(images)
            } catch(error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [])
    return (
        <div className="min-h-screen">
            {loading && <p className="text-gray-300 p-8">Loading...</p>}
            {error && <p className="text-red-400 p-8">Error: {error}</p>}
            {post && (
                <Layout>
                    <SEO 
                    title={post.title}
                    description={post.content?.slice(0, 155)}
                    url={`/case-studies/${post.slug}`}
                    />
                    <div className="py-6 md:py-16">
                        {/* Back button */}
                        <Link to="/case-studies" className="inline-flex items-center gap-2 text-amber-500 text-sm font-mono hover:underline mb-10 block">
                            ← Back to Case Studies
                        </Link>
    
                        {/* Title */}
                        <h1 className="text-4xl font-bold text-white mb-8 max-w-3xl leading-tight">{post.title}</h1>

                        {images.length > 0 && (
                            <div>
                                {/* Main Swiper */}
                                <Swiper
                                    initialSlide={1}
                                    spaceBetween={10}
                                    navigation={true}
                                    pagination={{
                                        clickable: true,
                                        dynamicBullets: true,
                                    }}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[Navigation, Pagination, Thumbs]}
                                    className="mb-4"
                                    // Adjust pagination for mobile only
                                    breakpoints={{
                                        640: { // >= md
                                            pagination: false,
                                        },
                                    }}
                                >
                                    {images.map((image) => (
                                        <SwiperSlide key={image.id}>
                                            <img
                                                src={image.url}
                                                alt={image.caption}
                                                className="w-full max-h-[700px] rounded-lg object-contain mb-4"
                                            />
                                            {image.caption && (
                                                <div className="text-gray-200 text-center text-sm mt-2">
                                                    {image.caption}
                                                </div>
                                            )}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                {/* Thumbnail Swiper - desktop only */}
                                <div className="hidden md:block mt-4 mb-8">
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={6}
                                        watchSlidesProgress={true}
                                        modules={[Thumbs]}
                                        centeredSlides={false}
                                        className="mx-auto mt-4"
                                        slidesPerView={images.length}
                                        style={{ width: `${images.length * 70}px` }}
                                    >
                                        {images.map((image) => (
                                            <SwiperSlide key={image.id} className="!w-16">
                                                <img
                                                    src={image.url}
                                                    alt={image.caption}
                                                    className="w-16 h-16 rounded object-cover border border-gray-700 cursor-pointer"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        )}
              
    
                        {/* Content */}
                        <div className="prose prose-invert prose-lg max-w-none
                            prose-headings:text-white prose-headings:font-bold
                            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                            prose-li:text-gray-300
                            prose-strong:text-white
                            prose-code:text-amber-400">
                            <ReactMarkdown>
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </Layout>
            )}
        </div>
    )
}