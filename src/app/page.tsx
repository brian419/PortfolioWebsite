//Home Page

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-28">
                    <div className="container mx-auto text-center flex flex-col justify-center items-center min-h-[70vh]">
                        <h1 className="text-6xl font-extrabold mb-6 text-[#49A097]">
                            Welcome to My Portfolio
                        </h1>
                        <p className="text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
                            I am a web developer specializing in React.js, Next.js, and Three.js. I create interactive and performant web applications.
                        </p>
                        <a
                            href="#projects"
                            className="bg-[#49A097] text-white px-8 py-4 rounded-full hover:bg-[#3d857c] transition duration-300"
                        >
                            View My Projects
                        </a>
                    </div>
                </section>

                {/* Horizontal Line */}
                <div className="w-full border-t-4 border-[#49A097]"></div>

                {/* Projects Section */}
                <section id="projects" className="py-20 bg-gray-100 text-gray-800">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-[#49A097]">
                            My Projects
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            Here, you’ll find a selection of my work that demonstrates my
                            skills in web development.
                        </p>
                        {/* Placeholder for your projects */}
                    </div>
                </section>

                {/* Horizontal Line */}
                <div className="w-full border-t-4 border-[#49A097]"></div>
            </main>
        </div>
    );
}

