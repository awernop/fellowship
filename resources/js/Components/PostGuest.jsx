import React, { useState } from 'react';
import { usePage, router, useForm } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import ModalPost from '@/Components/ModalPost';
import DeletePostButton from '@/Components/DeletePostButton';
import Dropdown from './Dropdown';
import Modal from '@/Components/Modal';


export const PostGuest = ({ post }) => {
    const [activePost, setActivePost] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [isModalPostOpen, setIsModalPostOpen] = useState(false);

    const Archive = (e, postId) => {
        e.preventDefault();
        e.stopPropagation();
        router.post(route('posts.updateArchive', { post: postId }), {
            preserveScroll: true,
            onSuccess: () => console.log('Post archived successfully'),
        });
    }



    const handlePostClick = (post, type) => {
        setActivePost(post);
        setModalType(type);
    };

    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const { delete: destroy, processing } = useForm();

    const confirmDelete = () => {
        setConfirmingDeletion(true);
        e?.stopPropagation();
    };

    const deletePost = () => {
        destroy(route('posts.destroy', post.id), {
            onSuccess: () => setConfirmingDeletion(false),
        });
    };
    return (
        <div className="flex flex-col border-b w-[360px] bg-white rounded-md shadow-md hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                >
            {post?.path_img && (
                <div className='relative w-full '>
                    <img
                        src={`/images/${post.path_img}`}
                        alt="Work image"
                        className='rounded-t-md'
                    />
                </div>

            )}
            <div className='p-4'>
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
                
            >
                <div>
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
                    <div>
                        <button onClick={() => {
                    handlePostClick(post, 'info');
                    setIsModalPostOpen(true)
                }}>
                        Подробнее
                        </button>
                    </div>
                    <p className='text-[14px]'>Уже откликнулось: {post.reports_count || 0}</p>
                </div>
            </div>
            </div>

            {/* Модальные окна */}
            {activePost && modalType === 'info' && (
                <ModalPost
                    post={activePost}
                    onClose={() => setActivePost(null)}
                    show={isModalPostOpen}
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
