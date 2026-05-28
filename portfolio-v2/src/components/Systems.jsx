import { systems } from '../data/systems';
import Card from './Card';

export default function Systems() {
    return (
        <section className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold py-4">Systems</h2>
            <div className="grid grid-cols-3 gap-4">
                {systems.map((system) => (
                    <Card key={system.id} url="systems" id={system.id} slug={system.slug} imgUrl={system.imgUrl} name={system.name} desc={system.desc} />
                ))}
            </div>
        </section>
    )
}