import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import SocialShareButton from '@/Components/ShareButton';

export default function PostPage({ }) {
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
            <div className="flex flex-col w-full">
                <div className=''>
                    <div className='flex items-start'>
                        <div className='flex flex-col items-center w-[45vw] p-4 bg-white mt-4 rounded-xl shadow-[1px_1px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.3)]'>
                            <div>
                                {post?.path_img && (
                                    <div className='relative' onClick={() => {
                                        handlePostClick(post, 'info');
                                        setIsModalPostOpen(true)
                                    }}>
                                        <div
                                            className='rounded-lg border'
                                            style={{
                                                backgroundImage: `url(/images/${post.path_img})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                width: '35vw',
                                                height: '300px',
                                                maxWidth: '100%',
                                            }}>
                                        </div>
                                    </div>

                                )}
                            </div>
                            <div className='mt-3'>
                                <h3 className='text-night font-bold text-[20px] mb-2'>{post.title}</h3>
                                <p style={{ whiteSpace: 'pre-wrap' }} className='text-[15px] text-gray-500 font-medium'>{post.description}</p>
                                <div className='flex w-full justify-between mt-3'>
                                    <p className='text-[13px] text-gray-400 font-regular'>Уже откликнулось: {post.reports_count || 0}</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full ml-5 mr-5'>
                            <div className='flex flex-col p-4 bg-gray-50 mt-4 rounded-xl shadow-[1px_1px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.3)]'>
                                <span className='font-semibold text-[20px] text-night'>Эта идея вас заинтересовала?</span>
                                <p className='text-[15px] text-gray-500 font-medium'>Если эта идея заинтересовала вас, или вы знаете того, кому она может понравиться, откликнитесь или поделитесь ей с другим пользователем</p>
                                <div>
                                    {currentUser ?
                                        (post.user_id === usePage().props.auth.user.id ? (
                                            <div>
                                                {/* Placeholder for owner actions */}
                                            </div>
                                        ) : (
                                            <button
                                                className="inline-flex justify-center items-center w-[50%] py-2 bg-night border border-transparent rounded-md font-semibold text-[14px] text-white hover:bg-[#363e4f] focus:bg-[#363e4f] active:bg-[#363e4f] transition ease-in-out duration-350 mt-5"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePostClick(post, 'report');
                                                }}
                                            >
                                                Предложить идею
                                            </button>
                                        ))
                                        :
                                        (
                                            <div>

                                            </div>
                                        )
                                    }
                                    <SocialShareButton />
                                </div>
                            </div>
                            <div className='flex flex-col p-4 bg-gray-50 mt-4 rounded-xl shadow-[1px_1px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.3)]'>
                                <p className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">Теги</p>
                                {post?.tags?.length > 0 ? (
                                    <div className="flex items-start flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="px-4 py-1 bg-[#ede6ff] opacity-80 text-[#715BC8] text-[15px] font-semibold rounded-lg"
                                            >
                                                {tag.title}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-[12px]">Пользователь не указал теги</p>
                                )}
                            </div>
                            <div className='flex flex-col p-4 bg-gray-50 mt-4 rounded-xl shadow-[1px_1px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.3)]'>
                                <p className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-2">Автор</p>
                                <div>
                                    <a href={route('users.posts', { login: post.user.login })}>
                                        <div className='flex items-center gap-2' onClick={(e) => { e.stopPropagation(); }}>
                                            {post.user?.path_img && (
                                                <div>
                                                    <img
                                                        src={`/images/${post.user.path_img}`}
                                                        alt="user pfp"
                                                        className="w-[35px] rounded-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <p className='text-[15px] font-semibold text-night opacity-80'>{post.user.username}</p>
                                                <p className='text-[14px] mt-[-4px] text-gray-500 font-regular opacity-80'>@{post.user.login}</p>
                                            </div>
                                        </div>
                                    </a>
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