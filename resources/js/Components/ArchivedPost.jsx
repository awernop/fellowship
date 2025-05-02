import React, { useState } from 'react';
import { usePage, router, useForm } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import ModalPost from '@/Components/ModalPost';
import Dropdown from './Dropdown';
import Modal from '@/Components/Modal';


export const ArchivedPost = ({ post }) => {
    const [activePost, setActivePost] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [isModalPostOpen, setIsModalPostOpen] = useState(false);

    const Archive = (e, postId) => {
        e.preventDefault();
        e.stopPropagation();
        router.post(route('posts.updateUnarchive', { post: postId }), {
            preserveScroll: true,
            onSuccess: () => console.log('Post unarchived successfully'),
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
                <div className='relative w-full ' onClick={() => {
                    handlePostClick(post, 'info');
                    setIsModalPostOpen(true)
                }}>
                    <img
                        src={`/images/${post.path_img}`}
                        alt="Work image"
                        className='rounded-t-md'
                    />
                </div>

            )}
            <div className='p-4 pt-3 flex flex-col justify-between'>
            <div className='flex justify-between'>
                <a href={route('users.posts', { login: post.user.login })}>
                    <div className='flex items-center gap-2' onClick={(e) => { e.stopPropagation(); }}>
                        {post.user?.path_img && (
                            <div>
                                <img
                                src={`/images/${post.user.path_img}`}
                                alt="user pfp"
                                className="w-[27px] mb-1 rounded-full object-cover"
                            />
                            </div>
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
            <div onClick={() => {
                    handlePostClick(post, 'info');
                    setIsModalPostOpen(true)
                }}
                
            >
                <div className='mt-1'>
                    <div >
                        <p className='text-[22px] font-semibold'>{post.title}</p>

                    </div>
                    <p className='text-[14px] font-sm text-muted-foreground'>{post.preview}</p>

                </div>

                <div className='flex flex-col items-start'>
                    {post?.tags?.length > 0 ? (
                        <div className="flex items-start mt-9 flex-wrap gap-2 mb-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="px-3 py-1 bg-[#EEEDFF] text-flower text-[12px] font-medium rounded-full"
                                >
                                    #{tag.title}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-[12px]">Пользователь не указал теги</p>
                    )}
                    <button onClick={(e) => Archive(e, post.id)} className="inline-flex items-center rounded-lg border border-transparent bg-flower py-2 px-7 text-[14px] font-semibold text-white transition duration-150 ease-in-out hover:bg-[#564be9] focus:bg-[#564be9] focus:outline-none focus:ring-2 mt-2">
                    Исключить пост из архива
                </button>
                </div>
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
