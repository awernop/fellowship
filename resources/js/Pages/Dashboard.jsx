import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import ModalPost from '@/Components/ModalPost';
import { Post } from '@/Components/Post';
import SideNavigation from '@/Components/SideNavigation';
import { PostHorizontal } from '@/Components/PostHorizontal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Dashboard({ }) {
    const [displayFormat, setDisplayFormat] = useState('cards');

    const { auth, posts, userPosts } = usePage().props;
    const currentUser = auth.user;


    return (
        <AuthenticatedLayout>
            <Head title="Главная" />
            <div className="flex h-[calc(100vh-100px)] bg-gray-100">
                {/* Зафиксированная часть */}
                <div className="w-55 flex-shrink-0 pt-3 sticky top-0 border m-2 bg-white rounded-3xl">
                    <SideNavigation />
                </div>
                {/* Часть с прокруткой */}
                <div className="flex flex-col gap-3 w-full overflow-y-auto pb-10">
                    <div className="flex flex-col items-start space-x-2 pt-6 px-2">
                        <div className='mb-5 w-full '>
                            <div className='flex items-center justify-between'>
                                <span className='text-[35px] font-extrabold text-night pl-3'>Привет, {currentUser.username}!👋</span>
                                <div>
                                    <button
                                        onClick={() => setDisplayFormat('cards')}
                                        className={`p-2 rounded-md ${displayFormat === 'cards' ? 'bg-[#eeedff] text-flower' : 'text-gray-500 hover:bg-gray-100'}`}
                                        title="Карточки"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5 11.5H7C6.71667 11.5 6.47933 11.404 6.288 11.212C6.09667 11.02 6.00067 10.7827 6 10.5V7C6 6.71667 6.096 6.47933 6.288 6.288C6.48 6.09667 6.71733 6.00067 7 6H10.5C10.7833 6 11.021 6.096 11.213 6.288C11.405 6.48 11.5007 6.71733 11.5 7V10.5C11.5 10.7833 11.404 11.021 11.212 11.213C11.02 11.405 10.7827 11.5007 10.5 11.5ZM10.5 18H7C6.71667 18 6.47933 17.904 6.288 17.712C6.09667 17.52 6.00067 17.2827 6 17V13.5C6 13.2167 6.096 12.9793 6.288 12.788C6.48 12.5967 6.71733 12.5007 7 12.5H10.5C10.7833 12.5 11.021 12.596 11.213 12.788C11.405 12.98 11.5007 13.2173 11.5 13.5V17C11.5 17.2833 11.404 17.521 11.212 17.713C11.02 17.905 10.7827 18.0007 10.5 18ZM17 11.5H13.5C13.2167 11.5 12.9793 11.404 12.788 11.212C12.5967 11.02 12.5007 10.7827 12.5 10.5V7C12.5 6.71667 12.596 6.47933 12.788 6.288C12.98 6.09667 13.2173 6.00067 13.5 6H17C17.2833 6 17.521 6.096 17.713 6.288C17.905 6.48 18.0007 6.71733 18 7V10.5C18 10.7833 17.904 11.021 17.712 11.213C17.52 11.405 17.2827 11.5007 17 11.5ZM17 18H13.5C13.2167 18 12.9793 17.904 12.788 17.712C12.5967 17.52 12.5007 17.2827 12.5 17V13.5C12.5 13.2167 12.596 12.9793 12.788 12.788C12.98 12.5967 13.2173 12.5007 13.5 12.5H17C17.2833 12.5 17.521 12.596 17.713 12.788C17.905 12.98 18.0007 13.2173 18 13.5V17C18 17.2833 17.904 17.521 17.712 17.713C17.52 17.905 17.2827 18.0007 17 18ZM5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5ZM5 19H19V5H5V19Z"
                                                fill={displayFormat === 'table' ? "#B6C2DC" : "#4e43e5"} />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setDisplayFormat('table')}
                                        className={`p-2 rounded-md ${displayFormat === 'table' ? 'bg-[#eeedff] text-flower' : 'text-gray-500 hover:bg-gray-100'}`}
                                        title="Таблица"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 21C3.71667 21 3.47933 20.904 3.288 20.712C3.09667 20.52 3.00067 20.2827 3 20V17.35C3 17.0667 3.096 16.8293 3.288 16.638C3.48 16.4467 3.71733 16.3507 4 16.35H20C20.2833 16.35 20.521 16.446 20.713 16.638C20.905 16.83 21.0007 17.0673 21 17.35V20C21 20.2833 20.904 20.521 20.712 20.713C20.52 20.905 20.2827 21.0007 20 21H4ZM4 14.35C3.71667 14.35 3.47933 14.254 3.288 14.062C3.09667 13.87 3.00067 13.6327 3 13.35V10.625C3 10.3417 3.096 10.1043 3.288 9.913C3.48 9.72167 3.71733 9.62567 4 9.625H20C20.2833 9.625 20.521 9.721 20.713 9.913C20.905 10.105 21.0007 10.3423 21 10.625V13.35C21 13.6333 20.904 13.871 20.712 14.063C20.52 14.255 20.2827 14.3507 20 14.35H4ZM4 7.625C3.71667 7.625 3.47933 7.529 3.288 7.337C3.09667 7.145 3.00067 6.908 3 6.626V4C3 3.71667 3.096 3.47933 3.288 3.288C3.48 3.09667 3.71733 3.00067 4 3H20C20.2833 3 20.521 3.096 20.713 3.288C20.905 3.48 21.0007 3.71733 21 4V6.625C21 6.90833 20.904 7.146 20.712 7.338C20.52 7.53 20.2827 7.62567 20 7.625H4Z"
                                                fill={displayFormat === 'cards' ? "#B6C2DC" : "#4e43e5"} />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className='w-full bg-white p-6 rounded-3xl border mt-5'>
                                <span className='text-[20px] font-medium'>Твои посты</span>
                                <div className='mt-4 flex items-center'>
                                    <div>
                                        <a className="inline-flex items-center px-[130px] py-8 bg-gray-100 border-gray-200 rounded-2xl font-semibold text-[14px] text-white hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 focus:outline-none transition ease-in-out duration-500"
                                            href={route('posts.create')}>
                                            <svg width="40" height="40" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.7916 13.5416H13.5416V19.7916H11.4583V13.5416H5.20825V11.4583H11.4583V5.20831H13.5416V11.4583H19.7916V13.5416Z" fill="#2A303E" />
                                            </svg>
                                        </a>
                                        <p>Новый пост</p>
                                    </div>
                                    <div className="relative w-full flex items-center gap-5 ml-7">
                                        {userPosts
                                            .filter(post => !post.archived)
                                            .map((item, index) => (
                                                <div
                                                    key={`slide-${index}`}
                                                >
                                                    <div className="slide-content">
                                                        {item.path_img && (
                                                            <div className="image-wrapper">
                                                                <img
                                                                    src={`/images/${item.path_img}`}
                                                                    alt={item.title || "Post image"}
                                                                    className="w-[200px] h-[104px] object-cover rounded-2xl"
                                                                />
                                                            </div>
                                                        )}
                                                        <p className="text-[15px] font-medium mt-2">{item.title}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                        {/* Заглушка при отсутствии постов */}
                                        {userPosts.filter(post => !post.archived).length === 0 && (
                                            <div style={{ width: '200px' }}>

                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="">
                        <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
                            {displayFormat === 'cards' ? (
                                <div className="w-full flex flex-wrap items-start overflow-hidden sm:rounded-lg">

                                    {posts
                                        .filter(post => !post.archived)
                                        .map((item) => (
                                            <Post post={item} key={item.id} />
                                        )
                                        )
                                    }
                                </div>
                            ) : (
                                <div className="flex flex-col items-start gap-3 gap-y-3 overflow-hidden sm:rounded-lg">

                                    {posts
                                        .filter(post => !post.archived)
                                        .map((item) => (
                                            <PostHorizontal post={item} key={item.id} />
                                        )
                                        )
                                    }
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </div>

        </AuthenticatedLayout>
    );
}