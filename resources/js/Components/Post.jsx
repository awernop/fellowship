import React, { useState } from 'react';
import { usePage, router, useForm } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import ModalPost from '@/Components/ModalPost';
import ModalClaim from './ModalClaim';
import Dropdown from './Dropdown';
import Modal from '@/Components/Modal';
import { createPortal } from 'react-dom';


export const Post = ({ post }) => {
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
        <div className="flex flex-col border-gray-200 w-[390px] bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer m-1"
        >
            <div className='p-3 pt-4 flex flex-col justify-between'>
                <div className='flex justify-between mb-3 px-2'>
                    <a href={route('users.posts', { login: post.user.login })}>
                        <div className='flex items-center gap-2' onClick={(e) => { e.stopPropagation(); }}>
                            {post.user?.path_img && (
                                <div>
                                    <img
                                        src={`/images/${post.user.path_img}`}
                                        alt="user pfp"
                                        className="w-[35px] mb-1 rounded-full object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <p className='text-[15px] font-medium'>{post.user.username}</p>
                                <p className='text-[14px] mt-[-4px]'>{post.user.login}</p>
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
                        (<p></p>
                            //     <Dropdown onClick={(e) => { e.stopPropagation(); }}>
                            //         <Dropdown.Trigger>
                            //             <button>
                            //                 <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            //                     <circle cx="15" cy="11" r="2" fill="#B6C2DC" />
                            //                     <circle cx="15" cy="17.4" r="2" fill="#B6C2DC" />
                            //                     <circle cx="15" cy="23.8" r="2" fill="#B6C2DC" />
                            //                 </svg>
                            //             </button>
                            //         </Dropdown.Trigger>

                            //         <Dropdown.Content>
                            //             <Dropdown.Link onClick={() => {
                            //     handlePostClick(post, 'claim');
                            // }}>
                            //                 Пожаловаться на пост
                            //             </Dropdown.Link>
                            //         </Dropdown.Content>
                            //     </Dropdown>
                        )
                    )
                    :
                    (<p></p>)
                }
                </div>
                <div onClick={() => {
                    handlePostClick(post, 'info');
                    setIsModalPostOpen(true)
                }}

                >
                    {post?.path_img && (
                        <div className='relative w-full ' onClick={() => {
                            handlePostClick(post, 'info');
                            setIsModalPostOpen(true)
                        }}>
                            <img
                                src={`/images/${post.path_img}`}
                                alt="Work image"
                                className='rounded-xl'
                            />
                        </div>

                    )}
                    <div className='mt-3'>
                        <div >
                            <p className='text-[25px] font-bold text-night pl-2'>{post.title}</p>

                        </div>
                        <p className='text-[14px] font-sm text-muted-foreground pl-3'>{post.preview}</p>

                    </div>

                    <div className='flex flex-col items-start p-2'>
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
                        <p className='text-[14px]'>Уже откликнулось: {post.reports_count || 0}</p>
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
            {activePost && modalType === 'info' && createPortal(
                <ModalPost
                    post={activePost}
                    onClose={() => {
                        setActivePost(null);
                        setModalType(null);
                    }}
                    show={isModalPostOpen}
                />,
                document.body
            )}

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
