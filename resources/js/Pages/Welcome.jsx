import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Post } from '@/Components/Post';
import image from '../../../public/images/bgwelcome.jpg';
import { ThemsOnWelcome } from '@/Components/ThemsOnWelcome';


export default function Welcome({ posts }) {
    const [displayFormat, setDisplayFormat] = useState('cards');

    return (
        <AuthenticatedLayout>
            <Head title="Главная" />
                <div className="flex flex-col gap-3">
                    <div className='w-full rounded-xl p-[80px] '
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <div className='flex items-center gap-2 w-[160px] px-3 py-2 rounded-full max-w-sm bg-white/20 backdrop-blur-md p-8
            border border-white/25 shadow-xl shadow-indigo-500/10
            hover:bg-white/25 transition-all duration-300 mb-5 cursor-pointer'>
                            <svg width="20" height="20" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 0L23.8329 10.9819C24.742 14.5061 27.4939 17.258 31.0181 18.1671L42 21L31.0181 23.8329C27.4939 24.742 24.742 27.4939 23.8329 31.0181L21 42L18.1671 31.0181C17.258 27.4939 14.5061 24.742 10.9819 23.8329L0 21L10.9819 18.1671C14.5061 17.258 17.258 14.5061 18.1671 10.9819L21 0Z" fill="white" />
                            </svg>
                            <p className='text-white text-[15px]'>Будем Вместе</p>
                        </div>
                        <h2 className='text-3xl font-bold text-white mb-2'>Меняем мир Вместе</h2>
                        <p className='text-white w-[600px] font-regular'>
                            Мы - первая крудсорсинговая платформа в России, предоставляющая
                            любому пользователю возможность создавать, откликаться, делиться. Работайте с вызовами
                            как от обычных пользователей, так и от известнейших компаний России, Казахстана, Белоруси и Китая.
                        </p>
                        <div className='flex items-center gap-3 mt-9'>
                            <a
                                href={route('posts.guest')}
                                className="`inline-flex items-center rounded-md bg-night py-[10px] px-10 text-[15px] font-semibold text-white transition duration-300 ease-in-out hover:bg-[#363e4f] shadow-[0_0_30px_rgba(255,255,255,0.3)] focus:bg-[#2A303E] focus:outline-none">
                                К вызовам
                            </a>
                            <a
                                href={route('register')}
                                className='text-white font-semibold text-[15px] hover:bg-[#F0EDFF] py-[10px] px-10 hover:bg-opacity-20 rounded-md transition duration-500 ease-in-out'>Присоединиться к Вместе</a>
                        </div>
                    </div>
                    <div>
                        <ThemsOnWelcome/>
                    </div>
                    <div>
                        <div className="flex flex-wrap items-start overflow-hidden sm:rounded-lg">
                        
                                                            {posts.length > 0 ? (
                                                                posts.map((item) => (
                                                                    <Post post={item} key={item.id} />
                                                                ))
                                                            ) : (
                                                                <div className="w-full text-center text-[14px] select-none opacity-40 py-10 text-[#6F7275] font-medium">
                                                                    {searchQuery ? "По вашему запросу ничего не найдено" : "Нет доступных постов"}
                                                                </div>
                                                            )}
                                                        </div>
                    </div>
                    <div>
                        
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}
