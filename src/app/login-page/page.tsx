//Home Page

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-28">
                    <div className="container mx-auto text-center flex flex-col justify-center items-center min-h-[70vh]">
                        <h1 className="text-6xl font-extrabold mb-6 text-[#49A097]">
                            TEMP
                        </h1>
                    </div>
                </section>

                {/* Horizontal Line */}
                <div className="w-full border-t-4 border-[#49A097]"></div>

                {/* Projects Section */}
                <section id="projects" className="py-20 bg-gray-100 text-gray-800">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-[#49A097]">
                            TEMP
                        </h2>
                    </div>
                </section>

                {/* Horizontal Line */}
                <div className="w-full border-t-4 border-[#49A097]"></div>
            </main>
        </div>
    );
}

