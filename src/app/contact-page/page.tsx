"use client";
import { useState } from 'react';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [formStatus, setFormStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (res.status === 200) {
                setFormStatus('Message sent successfully!');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setFormStatus('Failed to send message. Please try again later.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setFormStatus('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col text-gray-800">
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-[#49A097] mb-6">Contact Me</h1>
                    <p className="text-lg text-white max-w-3xl mx-auto">
                        I would love to hear from you! Whether you have a question, a project you’d like to discuss, or just want to say hello, feel free to get in touch.
                    </p>
                </div>

                {/* Contact Form */}
                <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#49A097] focus:border-[#49A097]"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#49A097] focus:border-[#49A097]"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#49A097] focus:border-[#49A097]"
                                required
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-[#49A097] text-white px-8 py-4 rounded-full hover:bg-[#3d857c] transition duration-300"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                    <p className="text-center mt-4 text-white">{formStatus}</p>
                </div>

                {/* Contact Information */}
                <div className="mt-12 text-center">
                    <p className="text-lg text-white">
                        You can also reach me via email at{' '}
                        <a href="mailto:json10@crimson.ua.edu" target="_blank" className="text-[#49A097] underline">
                            json10@crimson.ua.edu
                        </a>
                    </p>
                </div>
            </section>
        </div>
    );
}
