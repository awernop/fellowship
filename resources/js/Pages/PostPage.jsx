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

export default function PostPage({ }) {
    const [displayFormat, setDisplayFormat] = useState('cards');
    const [activePost, setActivePost] = useState(null);
    const [modalType, setModalType] = useState(null);
 const handlePostClick = (post, type) => {
        setActivePost(post);
        setModalType(type);
    };

    const { auth, post } = usePage().props;
    const currentUser = auth.user;


    return (
        <AuthenticatedLayout>
            <Head title="Главная" />
            <div className="flex h-screen bg-[#F8F7FB]">
                {/* Зафиксированная часть */}
                <div className="w-55 flex-shrink-0 pt-3 sticky top-0 bg-[#F8F7FB]">
                    <SideNavigation />
                </div>
                {/* Часть с прокруткой */}
                <div className="flex flex-col w-full overflow-y-auto pb-10">
                    <div className="flex flex-col items-start space-x-2 pt-6 px-2">
                    </div>
                    <div className='bg-white p-2 rounded-xl border mx-2'>
                       <div className='flex items-start'>
                         <div>
                            {post?.path_img && (
                                <div className='relative w-[40%] ' onClick={() => {
                                    handlePostClick(post, 'info');
                                    setIsModalPostOpen(true)
                                }}>
                                    <div
                                        className='rounded-lg'
                                        style={{
                                            backgroundImage: `url(/images/${post.path_img})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            width: '500px',
                                            height: '300px'
                                        }}>
                                    </div>
                                </div>

                    )}
                        </div>
                            <div className='w-full'>
                                <div className='py-8 mx-8'>
                                    <div className='w-full border-b pb-3'>
                                        <h3 className='text-night font-bold text-[28px]'>{post.title}</h3>
                                        <p style={{ whiteSpace: 'pre-wrap' }}>{post.description}</p>
                                    </div>
                                    <div>
                                    <p className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pt-5 pb-2">Автор</p>
                                    <div>
                                        <a href={route('users.posts', { login: post.user.login })}>
                                            <div className='flex items-center gap-2' onClick={(e) => { e.stopPropagation(); }}>
                                                {post.user?.path_img && (
                                                    <div>
                                                        <img
                                                            src={`/images/${post.user.path_img}`}
                                                            alt="user pfp"
                                                            className="w-[35px] rounded-md object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className='text-[15px] font-semibold'>{post.user.username}</p>
                                                    <p className='text-[14px] mt-[-4px]'>@{post.user.login}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {currentUser ?
                                                            (post.user_id === usePage().props.auth.user.id ? (
                                                                <div>
                                                                    {/* Placeholder for owner actions */}
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    className="inline-flex items-center px-[20%] py-2 bg-night border border-transparent rounded-md font-semibold text-[14px] text-white hover:bg-[#363e4f] focus:bg-[#363e4f] active:bg-[#363e4f]transition ease-in-out duration-350 mt-5"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handlePostClick(post, 'report');
                                                                    }}
                                                                >
                                                                    У меня есть идея!
                                                                </button>
                                                            ))
                                                            :
                                                            (
                                                                <div>
                                    
                                                                </div>
                                                            )
                                                        }
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {activePost && modalType === 'report' && (
                            <ModalReport
                                post_id={activePost.id}
                                onClose={() => {
                                    setActivePost(null);
                                    setModalType(null);
                                }}
                            />
                        )}

        </AuthenticatedLayout>
    );
}