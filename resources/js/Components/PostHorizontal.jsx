import React, { useState } from 'react';
import { usePage, router, useForm } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import ModalPost from '@/Components/ModalPost';
import Dropdown from './Dropdown';
import Modal from '@/Components/Modal';

export const PostHorizontal = ({ post }) => {
    const [activePost, setActivePost] = useState(null);
        const [modalType, setModalType] = useState(null);
        const [isModalPostOpen, setIsModalPostOpen] = useState(false);
        const { auth, url } = usePage().props;
        const user = auth.user;
    
        const Archive = (e, postId) => {
            e.preventDefault();
            e.stopPropagation();
            router.post(route('posts.updateArchive', { post: postId }), {
                preserveScroll: true,
                onSuccess: () => console.log('Post archived successfully'),
            });
        }
    
        const openPost = (e, postId) => {
            e.preventDefault();
            e.stopPropagation();
            router.get(route('post', { post: postId }), {
                preserveScroll: true,
                onSuccess: () => console.log('Post opened'),
            });
        }
    
        const handlePostClick = (post, type) => {
            setActivePost(post);
            setModalType(type);
        };
    
        const [confirmingDeletion, setConfirmingDeletion] = useState(false);
        const { delete: destroy, processing } = useForm();
    
        const confirmDelete = (e) => {
            setConfirmingDeletion(true);
            e?.stopPropagation();
        };
    
        const deletePost = () => {
            destroy(route('posts.destroy', post.id), {
                onSuccess: () => setConfirmingDeletion(false),
                preserveScroll: true,
                preserveState: true
            });
        };

    return (
        <div className="flex gap-5 items-center p-4 w-full bg-white rounded-xl transition-all duration-300 cursor-pointer shadow-[1px_1px_3px_rgba(163,177,198,0.2),-8px_-8px_10px_rgba(255,255,255,0.2)]"
        >    
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
                                                width: '20vw',
                                                height: '12vw',
                                                maxHeight: '100%',
                                            }}>
                                        </div>
                                    </div>

                                )}
            <div className='flex flex-col justify-between w-full'>
                <div className='flex justify-between'>
                    <a href={route('users.posts', { login: post.user.login })}>
                        <div className='flex items-center gap-2' onClick={(e) => { e.stopPropagation(); }}>
                            {post.user?.path_img && (
                                <div>
                                    <img
                                        src={`/images/${post.user.path_img}`}
                                        alt="user pfp"
                                        className="w-[27px] rounded-full object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <p className='text-[15px] font-semibold text-[#57595C]'>{post.user.username}</p>
                                <p className='text-[14px] mt-[-4px] text-gray-500 font-regular opacity-80'>@{post.user.login}</p>
                            </div>
                        </div>
                    </a>
                            {user ? (
                                post.user_id === usePage().props.auth.user.id ? (
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
                                    (
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
                                        </Dropdown>
                                    )
                            )
                                :
                                (<p></p>)
                            }
                        </div>
                        <div onClick={(e) => openPost(e, post.id)}
        
                        >
                            <div className='mt-1'>
                                <div >
                                    <p className='text-[20px] font-bold text-night text-muted-foreground line-clamp-2'>{post.title}</p>
        
                                </div>
                                <p className="text-[15px] text-gray-500 font-medium text-muted-foreground line-clamp-1">{post.preview}</p>
        
                            </div>
        
                            <div className='flex flex-col items-start mt-3'>
                                {post?.tags?.length > 0 ? (
                                    <div className="flex items-start flex-wrap gap-2 mb-2">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="px-4 py-1 bg-[#ede6ff] opacity-80 text-[#715BC8] text-[13px] font-bold rounded-lg"
                                            >
                                                {tag.title}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-[12px]">Пользователь не указал теги</p>
                                )}
                                <p className='text-[13px] text-gray-400 font-regular'>Уже откликнулось: {post.reports_count || 0}</p>
                            </div>
                        </div>
                    </div>
                    {confirmingDeletion && createPortal(
                        <div className="fixed inset-0 bg-gray-500/75 bg-opacity-50 flex items-center justify-center z-[1000]">
                            <div className="bg-white rounded-3xl p-6 max-w-md w-full">
                                <h2 className="text-[22px] font-medium text-gray-900">
                                    Вы уверены, что хотите удалить этот пост?
                                </h2>
                                <p className="text-[15px] font-normal text-gray-500 mt-2">
                                    Это действие нельзя будет отменить
                                </p>
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
                        </div>,
                        document.body
                    )}
        
                    {/* Модальные окна */}
                    {/* {activePost && modalType === 'info' && createPortal(
                        <ModalPost
                            post={activePost}
                            onClose={() => {
                                setActivePost(null);
                                setModalType(null);
                            }}
                            show={isModalPostOpen}
                        />,
                        document.body
                    )} */}
        
                    {activePost && modalType === 'report' && (
                        <ModalReport
                            post_id={activePost.id}
                            onClose={() => {
                                setActivePost(null);
                                setModalType(null);
                            }}
                        />
                    )}
        
                    {activePost && modalType === 'claim' && createPortal(
                        <ModalClaim
                            post_id={activePost.id}
                            onClose={() => {
                                setActivePost(null);
                                setModalType(null);
                            }}
                        />,
                        document.body
                    )}
                </div>
    )
}