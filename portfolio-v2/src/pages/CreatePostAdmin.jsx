import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
function SortableImage({ img, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: img.id })
    const style = { transform: CSS.Transform.toString(transform), transition }

    return (
        <div ref={setNodeRef} style={style} className="flex items-center gap-3 border rounded-md p-2">
            <div {...attributes} {...listeners} className="cursor-grab text-gray-400 px-2 text-xl">⠿</div>
            <img src={img.url} alt={img.caption} className="w-16 h-16 object-cover rounded" />
            <div className="flex flex-col flex-1 text-sm text-gray-600">
                <span>{img.caption}</span>
                <span className="text-xs text-gray-400">Order: {img.sort_order}</span>
            </div>
            <button type="button" onClick={() => onDelete(img.id)} className="text-red-500 hover:text-red-700 text-xs font-semibold">
                Remove
            </button>
        </div>
    )
}
export default function CreatePostAdmin() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imgurls, setImgurls] = useState([])
    const [existingImages, setExistingImages] = useState([]) // loaded in edit mode from post_images
    const [slug, setSlug] = useState('')
    const [featured, setFeatured] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const { slug: slugValue } = useParams()

    useEffect(() => {
        if (!slugValue) return
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('slug', slugValue)
                    .single()
                if (error) throw error
                setTitle(data.title)
                setContent(data.content)
                setSlug(data.slug)
                setFeatured(data.featured || false)

                // fetch existing images from post_images table
                const { data: images, error: imgError } = await supabase
                    .from('post_images')
                    .select('*')
                    .eq('post_id', data.id)
                    .order('sort_order', { ascending: true })
                if (imgError) throw imgError
                setExistingImages(images || [])
            } catch (error) {
                setError(error.message)
            }
        }
        fetchPost()
    }, [slugValue])

    const captionFromFilename = (filename) => {
        return filename
            .replace(/\.[^/.]+$/, '')       // strip extension
            .replace(/[-_]/g, ' ')           // replace - and _ with space
            .replace(/\b\w/g, c => c.toUpperCase()) // title case
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        const fileObjs = files.map((file, index) => ({
            file,
            previewUrl: URL.createObjectURL(file),
            caption: captionFromFilename(file.name),
            sortOrder: existingImages.length + index
        }))
        setImgurls(fileObjs)
    }

    const handleDeleteExisting = async (imageId) => {
        try {
            const { error } = await supabase
                .from('post_images')
                .delete()
                .eq('id', imageId)
            if (error) throw error
            setExistingImages(prev => prev.filter(img => img.id !== imageId))
        } catch (error) {
            setError(error.message)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setError('')
        try {
            let postId = null

            if (slugValue) {
                // get the post id first
                const { data: existing, error: fetchError } = await supabase
                    .from('posts')
                    .select('id')
                    .eq('slug', slugValue)
                    .single()
                if (fetchError) throw fetchError
                postId = existing.id

                const { error: updateError } = await supabase
                    .from('posts')
                    .update({ title, content, slug, featured })
                    .eq('slug', slugValue)
                if (updateError) throw updateError
            } else {
                const { data: inserted, error: insertError } = await supabase
                    .from('posts')
                    .insert({ title, content, slug, featured })
                    .select('id')
                    .single()
                if (insertError) throw insertError
                postId = inserted.id
            }

            // upload new images and insert into post_images
            for (const imgObj of imgurls) {
                const fileExt = imgObj.file.name.split('.').pop()
                const fileName = `${slug}-${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

                const { error: uploadError } = await supabase.storage
                    .from('post-images')
                    .upload(fileName, imgObj.file)
                if (uploadError) throw uploadError

                const { data: urlData } = supabase.storage
                    .from('post-images')
                    .getPublicUrl(fileName)

                const { error: imgInsertError } = await supabase
                    .from('post_images')
                    .insert({
                        post_id: postId,
                        url: urlData.publicUrl,
                        caption: imgObj.caption,
                        sort_order: imgObj.sortOrder
                    })
                if (imgInsertError) throw imgInsertError
            }

            // set posts.imgurl to first image (cover) if this is a new post or no cover yet
            if (imgurls.length > 0) {
                const firstUrl = await supabase.storage
                    .from('post-images')
                    .getPublicUrl(`${slug}-cover`) // we'll just use first post_image url instead
                
                // get the first post_image we just inserted
                const { data: firstImg } = await supabase
                    .from('post_images')
                    .select('url')
                    .eq('post_id', postId)
                    .order('sort_order', { ascending: true })
                    .limit(1)
                    .single()

                if (firstImg) {
                    await supabase
                        .from('posts')
                        .update({ imgurl: firstImg.url })
                        .eq('id', postId)
                }
            }

            setSuccess(true)
            setTimeout(() => navigate('/admin/posts/'), 1000)
        } catch (error) {
            if (error.message.includes('duplicate') || error.message.includes('unique')) {
                setError('This slug already exists. Please customize the slug.')
            } else {
                setError(error.message)
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 py-8 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8">
                <h1 className="text-3xl font-black text-blue-700 mb-6 text-center">
                    {slugValue ? 'Edit Post' : 'Create a New Post'}
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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

                    {/* Featured toggle */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={featured}
                            onChange={(e) => setFeatured(e.target.checked)}
                            className="w-4 h-4 accent-blue-600"
                        />
                        <label htmlFor="featured" className="font-semibold text-gray-700">
                            Show on Homepage
                        </label>
                    </div>

                    {/* Existing images in edit mode */}
                    {existingImages.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-gray-700">Current Images (drag to reorder)</label>
                            <DndContext collisionDetection={closestCenter} onDragEnd={({ active, over }) => {
                                if (active.id !== over?.id) {
                                    const oldIndex = existingImages.findIndex(img => img.id === active.id)
                                    const newIndex = existingImages.findIndex(img => img.id === over.id)
                                    const reordered = arrayMove(existingImages, oldIndex, newIndex)
                                        .map((img, i) => ({ ...img, sort_order: i }))
                                    setExistingImages(reordered)
                                    // save to supabase
                                    reordered.forEach(async (img) => {
                                        await supabase.from('post_images').update({ sort_order: img.sort_order }).eq('id', img.id)
                                    })
                                }
                            }}>
                                <SortableContext items={existingImages.map(img => img.id)} strategy={verticalListSortingStrategy}>
                                    {existingImages.map((img) => (
                                        <SortableImage key={img.id} img={img} onDelete={handleDeleteExisting} />
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </div>
                    )}

                    {/* New image upload */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="imgurl" className="font-semibold text-gray-700">
                            {existingImages.length > 0 ? 'Add More Images' : 'Images'}
                        </label>
                        <input
                            className="border border-gray-300 rounded-md p-2 file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 text-black"
                            type="file"
                            multiple
                            id="imgurl"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {imgurls.map((imgurl, index) => (
                            <div key={index} className="flex flex-col gap-1 border rounded-md p-2 mt-1">
                                <img src={imgurl.previewUrl} alt="Preview" className="w-full h-40 object-cover rounded" />
                                <input
                                    type="text"
                                    value={imgurl.caption}
                                    onChange={(e) => setImgurls(prev => prev.map((img, idx) =>
                                        idx === index ? { ...img, caption: e.target.value } : img
                                    ))}
                                    placeholder="Caption"
                                    className="border border-gray-200 rounded p-1 text-sm text-black mt-1"
                                />
                                <input
                                    type="number"
                                    value={imgurl.sortOrder}
                                    onChange={(e) => setImgurls(prev => prev.map((img, idx) =>
                                        idx === index ? { ...img, sortOrder: parseInt(e.target.value) } : img
                                    ))}
                                    placeholder="Sort order"
                                    className="border border-gray-200 rounded p-1 text-sm text-black"
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg font-bold hover:from-blue-600 hover:to-blue-800 transition-all mt-2 shadow disabled:opacity-50"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? 'Saving...' : slugValue ? 'Update Post' : 'Create Post'}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 text-center">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded text-green-700 text-center">
                        {slugValue ? 'Post updated successfully' : 'Post created successfully'}
                    </div>
                )}
            </div>
        </div>
    )
}