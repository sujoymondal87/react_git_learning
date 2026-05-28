const systems = [
    { id: '01', imgUrl: 'https://via.placeholder.com/150', name: 'No-Code App Builder', desc: 'Your description here' },
    { id: '02', imgUrl: 'https://via.placeholder.com/150', name: 'Offline-First Browser Runtime', desc: 'Your description here' },
    { id: '03', imgUrl: 'https://via.placeholder.com/150', name: 'Analytics', desc: 'Your description here' },
    { id: '04', imgUrl: 'https://via.placeholder.com/150', name: 'AR', desc: 'Your description here' },
    { id: '05', imgUrl: 'https://via.placeholder.com/150', name: 'Multi LLM model orchestration', desc: 'Your description here' },
    { id: '06', imgUrl: 'https://via.placeholder.com/150', name: 'Multi LLM model orchestration', desc: 'Your description here' },
    { id: '07', imgUrl: 'https://via.placeholder.com/150', name: 'Multi LLM model orchestration', desc: 'Your description here' },
    { id: '08', imgUrl: 'https://via.placeholder.com/150', name: 'Multi LLM model orchestration', desc: 'Your description here' },
    { id: '09', imgUrl: 'https://via.placeholder.com/150', name: 'Multi LLM model orchestration', desc: 'Your description here' },
    { id: '10', imgUrl: 'https://via.placeholder.com/150', name: 'Multi LLM model orchestration', desc: 'Your description here' },
    { id: '11', imgUrl: 'https://via.placeholder.com/150', name: 'Multi LLM model orchestration', desc: 'Your description here' },
    { id: '12', imgUrl: 'https://via.placeholder.com/150', name: 'Multi LLM model orchestration', desc: 'Your description here' }
  ]

export default function Systems() {
    return (
        <section className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold py-4">Systems</h2>
            <div className="grid grid-cols-3 gap-4">
                {systems.map((system) => (
                    <div key={system.id} className="bg-gray-800 p-4 rounded-md">
                        <img src={system.imgUrl} alt={system.name} className="w-[150px] h-[150px]" />
                        <h3>{system.name}</h3>
                        <p>{system.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}