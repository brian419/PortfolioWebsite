"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/api/login' : '/api/signup';
        try {
            const response = await axios.post(endpoint, { email, password });
            if (isLogin) {
                localStorage.setItem('token', response.data.token);
                console.log('Login successful:', response.data.token);
                router.push('/protected-pages/after-login-page'); 
            } else {
                console.log('Signup successful:', response.data.message);
                
            }
        } catch (error) {
            console.error('Error:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className='login-page flex items-center justify-center min-h-screen bg-[#f4f4f9]'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-2xl font-bold text-center mb-8 text-black'>Welcome to my portfolio</h2>
                <div className='flex justify-between mb-4'>
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`w-1/2 mr-1 py-2 rounded-l-full font-bold ${isLogin ? 'bg-[#49A097] text-white' : 'bg-gray-200 text-[#49A097]'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`w-1/2 ml-1 py-2 rounded-r-full font-bold ${!isLogin ? 'bg-[#49A097] text-white' : 'bg-gray-200 text-[#49A097]'}`}
                    >
                        Sign Up
                    </button>
                </div>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                        required
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49A097]'
                        required
                    />
                    <button type='submit' className='w-full bg-[#49A097] text-white py-2 rounded-full font-bold'>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <p className='text-center mt-4'>
                    <a href='/forgot-password' className='text-[#49A097] hover:underline'>
                        Forgot Password?
                    </a>
                </p>
            </div>
        </div>
    );
}