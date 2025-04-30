import React, { useState } from 'react';
import { usePage, router, useForm } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import ModalPost from '@/Components/ModalPost';
import DeletePostButton from '@/Components/DeletePostButton';
import Dropdown from './Dropdown';
import Modal from '@/Components/Modal';


export const Post = ({ post }) => {
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
                {post.user_id === usePage().props.auth.user.id ? (
                        <Dropdown onClick={(e) => { e.stopPropagation(); }}>
                            <Dropdown.Trigger>
                                <button>
                                <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="15" cy="11" r="2" fill="#B6C2DC" />
  <circle cx="15" cy="17.4" r="2" fill="#B6C2DC" />
  <circle cx="15" cy="23.8" r="2" fill="#B6C2DC" />
</svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link onClick={(e) => Archive(e, post.id)}>
                                Скрыть пост
                                </Dropdown.Link>
                                <button className='className="block w-full text-left text-red-600 text-[14px] px-4 py-2 hover:bg-gray-100 text-red-600"'
    onClick={(e) => {
        e.stopPropagation();
        confirmDelete(e);
    }}
>
    Удалить
</button>
                            </Dropdown.Content>
                        </Dropdown>)
                        :
                        (<p></p>)
                }
            </div>
            <div
                className="cursor-pointer"
                onClick={() => {
                    handlePostClick(post, 'info');
                    setIsModalPostOpen(true)
                }}
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
            <Modal show={confirmingDeletion} onClose={() => setConfirmingDeletion(false)}>
                            <div className="p-6">
                                <h2 className="text-[22px] font-medium text-gray-900">
                                    Вы уверены, что хотите удалить этот пост?
                                </h2>
                                <p className="text-[15px] font-normal text-gray-500"> Это действие нельзя будет отменить</p>
                                <div className="mt-6 flex justify-end">
                                    <button
                                        className="px-4 py-2 bg-gray-200 rounded-md mr-2"
                                        onClick={() => setConfirmingDeletion(false)}
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        onClick={deletePost}
                                        disabled={processing}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                                    >
                                        {processing ? 'Удаление...' : 'Удалить'}
                                    </button>
                                </div>
                            </div>
                        </Modal>

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
