import Image from 'next/image';
import headshot from '../../components/Photo.png'; 

export default function AboutMe() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
            
            {/* About Me Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-[#49A097] mb-6">
                        About Me
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Hi, I&apos;m Jeongbin Son, a passionate web developer specializing in creating interactive web applications with React.js, Next.js, and Three.js. I enjoy building websites and learning new technologies to push the limits of what&apos;s possible in web development.
                    </p>
                </div>

                {/* Photo Section */}
                <div className="flex justify-center mb-12">
                    <Image src={headshot} alt="Jeongbin Son" width={300} height={300} className="rounded-full" />
                </div>
                
                <div className="flex flex-wrap justify-center items-start space-y-8 md:space-y-0 md:space-x-8">
                    {/* Personal Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md">
                        <h2 className="text-3xl font-bold text-[#49A097] mb-4">Personal Background</h2>
                        <p className="text-gray-700 leading-relaxed">
                            I was born and raised in South Korea and have spent over 15 years in the United States, which has given me a unique perspective on both cultures. With my bilingual skills, I have a deep passion for helping bridge communication gaps through technology and language.
                        </p>
                    </div>

                    {/* Professional Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md">
                        <h2 className="text-3xl font-bold text-[#49A097] mb-4">Professional Journey</h2>
                        <p className="text-gray-700 leading-relaxed">
                            I am a Computer Science major at the University of Alabama, currently interning at ChemTalk where I build web applications to promote chemistry education. With experience in React.js, Next.js, and Tailwind CSS, I aim to develop intuitive and impactful user experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold text-[#49A097] mb-8">
                        My Skills
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-2">React.js</h3>
                            <p className="text-gray-300">Creating interactive and dynamic user interfaces.</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-2">Next.js</h3>
                            <p className="text-gray-300">Developing server-side rendered web applications.</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-2">Three.js</h3>
                            <p className="text-gray-300">Building immersive 3D experiences on the web.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
