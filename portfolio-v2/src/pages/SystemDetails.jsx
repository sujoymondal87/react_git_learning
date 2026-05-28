import { useParams } from 'react-router-dom';
import { systems } from '../data/systems';

export default function SystemDetails() {
    const { slug } = useParams()
    const system = systems.find((system) => system.slug === slug)
    return (
        system ? (<div>
            <h1>System Details</h1>
                <p>{slug}</p>
                <p>{system.name}</p>
            </div>
        ) : (
            <div>
                <h1>System not found</h1>
            </div>
        )
    )
}