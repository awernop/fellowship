import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { Post } from '@/Components/Post';
import { PostHorizontal } from '@/Components/PostHorizontal';

export default function Dashboard({ }) {
    const [displayFormat, setDisplayFormat] = useState('cards');

    const { auth, posts, userPosts } = usePage().props;
    const currentUser = auth.user;

    const hasPosts = posts?.data.filter(post => !post.archived).length > 0;

    const openPost = (e, postId) => {
            e.preventDefault();
            e.stopPropagation();
            router.get(route('post', { post: postId }), {
                preserveScroll: true,
                onSuccess: () => console.log('Post opened'),
        });
    }


    return (
        <AuthenticatedLayout>
            <Head title="Главная" />
                <div className="flex flex-col w-full">
                    <div className="flex flex-col items-start space-x-2 pt-6 px-2">
                        <div className='mb-5 w-full '>
                            <div className='flex items-center justify-between'>
                                <span className='text-[35px] font-extrabold text-[#393B3F] pl-3 select-none'>Привет, {currentUser.username}!👋</span>
                                <div>
                                    
                                </div>
                            </div>
                            <div className='w-full px-6 rounded-xl mt-5 bg-gray-50 text-gray-600 py-6 font-medium shadow-[2px_-1px_16px_rgba(163,177,198,0.2),-8px_-8px_16px_rgba(255,255,255,0.3)]'>
                                <span className='text-[20px] font-semibold text-[#57595C]'>Твои посты</span>
                                <div className='mt-4 flex items-center'>
                                    <div>
                                        <a className="inline-flex items-center px-[130px] py-8 bg-gray-100 border-gray-200 rounded-lg font-semibold text-[14px] text-white hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 focus:outline-none transition ease-in-out duration-500"
                                            href={route('posts.create')}>
                                            <svg width="40" height="40" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.7916 13.5416H13.5416V19.7916H11.4583V13.5416H5.20825V11.4583H11.4583V5.20831H13.5416V11.4583H19.7916V13.5416Z" fill="#2A303E" />
                                            </svg>
                                        </a>
                                        <p className='text-[#57595C] font-medium'>Новый пост</p>
                                    </div>
                                    <div className="relative w-full flex items-center gap-5 ml-7">
                                        {userPosts
                                            .filter(post => !post.archived)
                                            .map((item, index) => (
                                                <div
                                                    key={`slide-${index}`} onClick={(e) => openPost(e, item.id)} className='cursor-pointer'
                                                >
                                                    <div className="slide-content">
                                                        {item.path_img && (
                                                            <div className="image-wrapper">
                                                                <img
                                                                    src={`/images/${item.path_img}`}
                                                                    alt={item.title || "Post image"}
                                                                    className="w-[200px] h-[104px] object-cover rounded-lg"
                                                                />
                                                            </div>
                                                        )}
                                                        <p className="text-[15px] w-[200px] font-semibold mt-2 truncate">{item.title}</p>
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
                    <div className="m-2">
                        <div className="mx-auto max-w-8xl">
                            <span className='text-[28px] font-bold text-[#57595C] pl-3 select-none'>Для тебя</span>
                            {hasPosts ? (
                                displayFormat === 'cards' ? (
                                    <div className="w-full flex flex-wrap items-start overflow-hidden sm:rounded-lg mt-4">
                                        {posts.data
                                            .filter(post => !post.archived)
                                            .map((item) => (
                                                <Post post={item} key={item.id} />
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-start gap-3 gap-y-3 overflow-hidden sm:rounded-lg">
                                        {posts.data
                                            .filter(post => !post.archived)
                                            .map((item) => (
                                                <PostHorizontal post={item} key={item.id} />
                                            ))
                                        }
                                    </div>
                                )
                            ) : (
                                <div className="bg-white p-8 rounded-xl border mt-4 text-center">
                                    <h3 className="text-[20px] font-semibold text-[#57595C]">
                                        Нет доступных постов
                                    </h3>
                                    <p className="mt-2 text-[14px] text-gray-500">
                                        Здесь пока нет ни одного поста. Подпишитесь на других пользователей, чтобы увидеть их публикации.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}