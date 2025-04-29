import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import ModalPost from '@/Components/ModalPost';
import DeletePostButton from '@/Components/DeletePostButton';
import Dropdown from './DropdownHover';


export const Post = ({ post }) => {
    const [activePost, setActivePost] = useState(null);
    const [modalType, setModalType] = useState(null);

    const Archive = (e, postId) => {
        e.preventDefault();
        e.stopPropagation();
        router.post(route('posts.updateArchive', { post: postId }), {
            preserveScroll: true,
            onSuccess: () => console.log('Post archived successfully'),
        });
    }

    const Destroy = (e, postId) => {
        e.stopPropagation();
        destroy(route('posts.destroy',{ post: postId }), {
            onSuccess: () => setConfirmingDeletion(false),
        });
    };

    const handlePostClick = (post, type) => {
        setActivePost(post);
        setModalType(type);
    };
    return (
        <div className="flex flex-col p-4 border-b w-[360px] bg-white rounded-md">
            <div className='flex justify-between'>
                <a href={route('users.posts', { login: post.user.login })}>
                    <div className='flex items-center gap-1' onClick={(e) => { e.stopPropagation(); }}>
                        {post.user?.path_img && (
                            <img
                                src={`/images/${post.user.path_img}`}
                                alt="user pfp"
                                className="w-[25px] mb-1"
                            />
                        )}
                        <div>
                            <p className='text-[15px] font-medium'>{post.user.username}</p>
                            <p className='text-[14px] mt-[-4px]'>@{post.user.login}</p>
                        </div>
                    </div>
                </a>
            </div>
            <div
                className="cursor-pointer"
                onClick={() => handlePostClick(post, 'info')}
            >
                <div>
                    {post?.path_img && (
                        <div className='relative h-48 w-full'>
                            <img
                                src={`/images/${post.path_img}`}
                                alt="Work image"
                                className="w-[100px]" />
                        </div>

                    )}

                    <div >
                        <p className='text-[22px] font-semibold'>{post.title}</p>

                    </div>
                    <p className='text-[14px] font-sm text-muted-foreground'>{post.preview}</p>

                </div>

                <div className='flex flex-col items-start'>
                    {post?.tags?.length > 0 ? (
                        <div className="flex items-start mt-12 flex-wrap gap-2 mb-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="px-3 py-1 bg-[#EEEDFF] text-flower text-sm font-medium rounded-full"
                                >
                                    {tag.title}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">Пользователь не указал теги</p>
                    )}
                    <p className='text-[14px]'>Уже откликнулось: {post.reports_count || 0}</p>
                </div>
                {/* Кнопки действий */}
                <div className="mt-3">
                                    {post.user_id === usePage().props.auth.user.id ? (
                                        <div>
                                            <button
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-350"
                                            onClick={(e) => Archive(e, post.id)}
                                        >
                                            ЗААРХИВИРОВАТЬ
                                        </button>
                                        <DeletePostButton post={post} />
                                        </div>
                                    ) : (
                                        <button
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-350"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePostClick(post, 'report');
                                            }}
                                        >
                                            У МЕНЯ ЕСТЬ ИДЕЯ
                                        </button>
                                    )}
                                </div>
            </div>

            {/* Модальные окна */}
            {activePost && modalType === 'info' && (
                <ModalPost
                    post={activePost}
                    onClose={() => setActivePost(null)}
                />
            )}

            {activePost && modalType === 'report' && (
                <ModalReport
                    post_id={activePost.id}
                    onClose={() => setActivePost(null)}
                />
            )}
        </div>
    )
}
