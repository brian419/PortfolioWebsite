"use client";
import { useState } from 'react';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [formStatus, setFormStatus] = useState('');

    const [attachments, setAttachments] = useState<File[]>([]);
    const [fileNames, setFileNames] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);

        // append all attached files to form data
        attachments.forEach((file) => {
            formData.append('attachments', file); // 
        });

        // const apiUrl = process.env.NODE_ENV === 'production'
        //     ? 'https://jeongbinson.com/api/sendEmail'
        //     : '/api/sendEmail';

        const apiUrl = (process.env.NODE_ENV === 'production' && 
            (window.location.origin === 'https://jeongbinson.com' || window.location.origin === 'https://dev.jeongbinson.com'))
            ? `${window.location.origin}/api/sendEmail`
            : '/api/sendEmail';

        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
            });

            if (res.status === 200) {
                setFormStatus('Your message has been sent successfully!');
                console.log('Successful API URL: ' + apiUrl);
                setName('');
                setEmail('');
                setMessage('');
                setAttachments([]);
            } else {
                const errorData = await res.json();
                setFormStatus('Failed to send message - ' + (errorData.error || 'An error occurred.'));
            }
        } catch (error) {
            setFormStatus('An unexpected error occurred.');
            console.log('Failed API URL: ' + apiUrl);
        }
    };



    // clearing status message when typing
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setFormStatus('');
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setFormStatus('');
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        setFormStatus('');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files); // converts FileList to an array
            setAttachments((prevAttachments) => [...prevAttachments, ...newFiles]); // appends the new files
            setFileNames((prevFileNames) => [...prevFileNames, ...newFiles.map((file) => file.name)]); // appends the file names
        }
    };

    return (
        <div className="min-h-screen flex flex-col text-gray-800">
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#49A097] to-[#1D976C] mb-6 shadow-xl p-4">
                        Contact Form
                    </h1>
                    <p className="text-lg text-white max-w-3xl mx-auto">
                        I would love to hear from you! Whether you have a question, a project you’d like to discuss, or just want to say hello, feel free to get in touch.
                    </p>
                    <br></br>

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
                                onChange={handleNameChange} // uses the handleNameChange function to update the name state
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
                                onChange={handleEmailChange}
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
                                onChange={handleMessageChange}
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#49A097] focus:border-[#49A097]"
                                required
                            ></textarea>
                        </div>
                        {/* user can send attachment(s) in the email */}
                        <div className="mb-6">
                            <label htmlFor="attachment" className="cursor-pointer border-2 border-black rounded-lg p-2 flex justify-between items-center">
                                Attachment(s) <span className="text-gray-500">(Optional)</span>
                                <input
                                    type="file"
                                    id="attachment"
                                    name="attachment"
                                    accept=".png, .jpg, .jpeg, .webp, .pdf, .mov, .heic, .mp4, .zip, .docx"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    multiple
                                />
                            </label>
                            {fileNames.length > 0 && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-700">Selected file(s):</p>
                                    <ul className="list-disc list-inside text-gray-900">
                                        {fileNames.map((fileName, index) => (
                                            <li key={index}>{fileName}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* send message button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-[#49A097] text-white px-8 py-4 rounded-full hover:bg-[#3d857c] transition duration-300"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                    {/* <p className="text-center mt-4 text-white">{formStatus}</p> */}
                    <p className={`text-center mt-4 ${formStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                        {formStatus}
                    </p>

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