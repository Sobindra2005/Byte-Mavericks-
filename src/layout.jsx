const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-lg font-bold">My App</h1>
            </header>
            <div className="flex flex-1">
                <aside className="bg-gray-200 w-64 p-4">
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                        </ul>x
                    </nav>
                </aside>
                <main className="flex-1 p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default MainLayout