const SUPABASE_URL = globalThis.SUPABASE_URL ?? process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = globalThis.SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY

export const config = {
    matcher: '/case-studies/:slug*'
}

export default async function middleware(request) {
    const url = new URL(request.url)
    const slug = url.pathname.replace('/case-studies/', '')

    if (!slug) return new Response(null, { status: 200 })

    try {
        const res = await fetch(
            `${SUPABASE_URL}/rest/v1/posts?slug=eq.${slug}&select=title,content,imgurl&limit=1`,
            {
                headers: {
                    apikey: SUPABASE_ANON_KEY,
                    Authorization: `Bearer ${SUPABASE_ANON_KEY}`
                }
            }
        )
        const posts = await res.json()
        const post = posts?.[0]

        if (!post) {
            // fall through to SPA
            const htmlRes = await fetch(new URL('/', request.url).toString())
            const html = await htmlRes.text()
            return new Response(html, { headers: { 'content-type': 'text/html' } })
        }

        const title = post.title
        const description = post.content?.slice(0, 155) ?? ''
        const image = post.imgurl ?? ''
        const pageUrl = `https://sujoymondal-tech.vercel.app${url.pathname}`

        const htmlRes = await fetch(new URL('/', request.url).toString())
        let html = await htmlRes.text()

        const ogTags = `
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
`
        html = html.replace('</head>', `${ogTags}</head>`)

        return new Response(html, {
            headers: { 'content-type': 'text/html' }
        })
    } catch (e) {
        const htmlRes = await fetch(new URL('/', request.url).toString())
        const html = await htmlRes.text()
        return new Response(html, { headers: { 'content-type': 'text/html' } })
    }
}