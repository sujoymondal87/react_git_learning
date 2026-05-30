import { systems } from '../data/systems';
import Card from './Card';

export default function Systems() {
    return (
        <section className="py-16 border-b border-gray-800">
            <p className="text-amber-500 text-sm font-mono mb-4">02 / Systems</p>
            <h2 className="text-3xl font-bold text-white mb-10">20 production systems. One engineer.</h2>
            <div className="grid grid-cols-3 gap-4">
                {systems.map((system) => (
                    <Card key={system.id} url="systems" id={system.id} slug={system.slug} imgUrl={system.imgUrl} name={system.name} desc={system.desc} />
                ))}
            </div>
        </section>
    )
}