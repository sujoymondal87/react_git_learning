const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const BASE_URL = 'https://sujoymondal-tech.vercel.app'

export default async function handler(req, res) {
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/posts?select=slug,created_at&order=created_at.desc`,
            {
                headers: {
                    apikey: SUPABASE_ANON_KEY,
                    Authorization: `Bearer ${SUPABASE_ANON_KEY}`
                }
            }
        )
        const posts = await response.json()

        const staticPages = [
            { url: BASE_URL, priority: '1.0', changefreq: 'weekly' },
            { url: `${BASE_URL}/case-studies`, priority: '0.9', changefreq: 'weekly' },
            { url: `${BASE_URL}/contact`, priority: '0.7', changefreq: 'monthly' },
        ]

        const postPages = posts.map(post => ({
            url: `${BASE_URL}/case-studies/${post.slug}`,
            priority: '0.8',
            changefreq: 'monthly',
            lastmod: post.created_at?.split('T')[0]
        }))

        const allPages = [...staticPages, ...postPages]

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

        res.setHeader('Content-Type', 'application/xml')
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
        res.status(200).send(xml)
    } catch (e) {
        res.status(500).send('Error generating sitemap')
    }
}