import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
export default function CreatePostAdmin() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imgurl, setImgurl] = useState(null)
    const [slug, setSlug] = useState('')
    const [error, setError] = useState('')
    const [data, setData] = useState(null)
    const navigate = useNavigate()
    const { slug: slugValue } = useParams()
    useEffect(() => {
        if (!slugValue) return  // skip fetch if create mode
        const fetchPost = async () => {
          try {
            console.log(slugValue)
            const { data, error } = await supabase.from('posts').select('*').eq('slug', slugValue).single()
            console.log('data', data)
            if(error) throw error
            setTitle(data.title)
            setContent(data.content)
            setImgurl(data.imgurl)
            setSlug(data.slug)
          } catch(error) {
            setError(error.message)
          }
        }
        fetchPost()
      }, [slugValue])
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let imageUrl = null
    
            if(imgurl && imgurl instanceof File) {
                const fileExt = imgurl.name.split('.').pop()
                const fileName = `${slug}-${Date.now()}.${fileExt}`
                
                const { error: uploadError } = await supabase.storage
                    .from('post-images')
                    .upload(fileName, imgurl)
                
                if(uploadError) throw uploadError
                
                const { data: urlData } = supabase.storage
                    .from('post-images')
                    .getPublicUrl(fileName)
                
                imageUrl = urlData.publicUrl
            }

            if(slugValue) {
                const { error: updateError } = await supabase.from('posts').update({title, content, slug, imgurl: imageUrl}).eq('slug', slugValue)
                if(updateError) throw updateError
            } else {
                const { error: insertError } = await supabase.from('posts').insert({title, content, slug, imgurl: imageUrl})
                if(insertError) throw insertError
            }
            console.log(data)
            navigate(`/admin/posts/`)
            setTitle('')
            setContent('')
            setImgurl(null)
            setSlug('')
            setError('')
            setData(data)
        } catch(error) {
            if(error.message.includes('duplicate') || error.message.includes('unique')) {
                setError('This slug already exists. Please customize the slug.')
            } else {
                setError(error.message)
            }
            console.error(error)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 py-8 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8">
                <h1 className="text-3xl font-black text-blue-700 mb-6 text-center">Create a New Post</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6" >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="slug" className="font-semibold text-gray-700">Slug</label>
                        <input
                            className="border border-gray-300 focus:border-blue-500 rounded-md p-2 transition duration-150 focus:outline-none text-black"
                            id="slug"
                            value={slug}
                            onChange={(e) => {
                                const generated = e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                                setSlug(generated)
                              }}
                            placeholder="auto-generated or customize"
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="font-semibold text-gray-700">Title</label>
                        <input
                            className="border border-gray-300 focus:border-blue-500 rounded-md p-2 transition duration-150 focus:outline-none text-black"
                            id="title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                const generated = e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                                setSlug(generated)
                            }}
                            placeholder="Post title"
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="content" className="font-semibold text-gray-700">Content</label>
                        <textarea
                            className="border border-gray-300 focus:border-blue-500 rounded-md p-2 min-h-[120px] resize-y transition duration-150 focus:outline-none text-black"
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your post content here..."
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="imgurl" className="font-semibold text-gray-700">Image</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 text-black"
                            type="file"
                            id="imgurl"
                            accept="image/*"
                            onChange={(e) => setImgurl(e.target.files[0])}
                        />
                        {imgurl instanceof File && (
                            <img src={URL.createObjectURL(imgurl)} alt="Preview" className="w-full h-auto mt-2" />
                        )}
                        {imgurl && typeof imgurl === 'string' && (
                            <img src={imgurl} alt="Current Image" className="w-full h-auto mt-2" />
                        )}
                    </div>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg font-bold hover:from-blue-600 hover:to-blue-800 transition-all mt-2 shadow"
                        type="submit"
                    >
                        {slugValue ? 'Update Post' : 'Create Post'}
                    </button>
                </form>
                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 text-center">
                        {error}
                    </div>
                )}
                {data && (
                    <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded text-green-700 text-center">
                        {slugValue ? 'Post updated successfully' : 'Post created successfully'}
                    </div>
                )}
            </div>
        </div>
    )
}