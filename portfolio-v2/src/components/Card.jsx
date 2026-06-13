import { Link } from 'react-router-dom';

export default function Card({ url, id,slug, imgUrl, name,desc,timestamp=null }) {
    const plainText = desc?.replace(/[#*_`>\[\]]/g, '').trim();
    return (
        <Link to={`/${url}/${slug}`} className="block">
            <article className="bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-bold text-white mb-2">{name.slice(0, 60)}...</h3>
                <img src={imgUrl} alt={name} className="w-full h-[200px] rounded-md mb-2 object-contain bg-gray-900 p-1" />
                
                <p className="text-sm text-gray-200">{plainText?.slice(0, 350)}...</p>
            </article>
        </Link>
    )
}