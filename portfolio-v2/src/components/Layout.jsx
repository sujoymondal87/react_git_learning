export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex justify-center">
                <div className="w-full max-w-[1100px] px-4">{children}</div>
            </main>
        </div>
    )
}