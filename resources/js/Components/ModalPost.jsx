import { usePage } from '@inertiajs/react';
import ModalReport from './ModalReport';
import React, { useState } from 'react';
import Modal from './Modal';

export default function ModalPost({ post, show = false, onClose }) {
    const [activePost, setActivePost] = useState(null);
    const [modalType, setModalType] = useState(null);

    const handlePostClick = (post, type) => {
        setActivePost(post);
        setModalType(type);
    };

    return (
        <>
            <Modal show={show} onClose={onClose} maxWidth="xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">{post.title}</h2>
                        <button
                            onClick={onClose}
                            className="transform -translate-y-1/2 font-extrabold text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                    
                    {post?.path_img && (
                        <img
                            src={`/images/${post.path_img}`}
                            alt="Work image"
                            className="w-full h-auto mb-4"
                        />
                    )}

                    <div className="mb-3">
                        <h3 className="font-semibold">Превью:</h3>
                        <p>{post.preview}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Описание:</h3>
                        <p>{post.description}</p>
                    </div>

                    <div className="mt-4">
                        {post.user_id === usePage().props.auth.user.id ? (
                            <div>
                                {/* Placeholder for owner actions */}
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
                
            </Modal>

            {activePost && modalType === 'report' && (
                <ModalReport
                    post_id={activePost.id}
                    onClose={() => setActivePost(null)}
                />
            )}
        </>
    );
}