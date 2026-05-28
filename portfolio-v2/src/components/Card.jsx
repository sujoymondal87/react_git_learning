import { Link } from 'react-router-dom';

export default function Card({ url, id,slug, imgUrl, name,desc,timestamp=null }) {
    return (
        <Link to={`/${url}/${slug}`} className="block">
            <article className="bg-gray-800 p-4 rounded-md">
                <img src={imgUrl} alt={name} className="w-[150px] h-[150px]" />
                <h3>{name}</h3>
                <p>{desc}</p>
                {timestamp && <p>{timestamp}</p>}
            </article>
        </Link>
    )
}