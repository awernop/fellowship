import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import ModalPost from '@/Components/ModalPost';
import DeletePostButton from '@/Components/DeletePostButton';

export default function Dashboard({ posts }) {
    const [activePost, setActivePost] = useState(null);
    const [modalType, setModalType] = useState(null);

    const Archive = (e, postId) => {
        e.preventDefault();
        router.post(route('posts.updateArchive', { post: postId }), {
            preserveScroll: true,
            onSuccess: () => console.log('Post archived successfully'),
        });
    }

    const handlePostClick = (post, type) => {
        setActivePost(post);
        setModalType(type);
    };


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {posts.filter(post => !post.archived).map((item) => (
                            <div key={item.id} className="mb-4 p-4 border-b">
                                {/* Область для просмотра информации */}
                                <div
                                    className="cursor-pointer"
                                    onClick={() => handlePostClick(item, 'info')}
                                >
                                    {item?.path_img && (
                                        <img
                                            src={`/images/${item.path_img}`}
                                            alt="Work image"
                                            className="w-[100px]"                                        />
                                    )}
                                    <p>{item.title}</p>
                                    <p>{item.description}</p>
                                    <p>Кол-во откликов: {item.reports_count || 0}</p>
                                </div>

                                {/* Кнопки действий */}
                                <div className="mt-3">
                                    {item.user_id === usePage().props.auth.user.id ? (
                                        <div>
                                            <button
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-350"
                                            onClick={(e) => Archive(e, item.id)}
                                        >
                                            ЗААРХИВИРОВАТЬ
                                        </button>
                                        <DeletePostButton post={item} />
                                        </div>
                                    ) : (
                                        <button
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-350"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePostClick(item, 'report');
                                            }}
                                        >
                                            У МЕНЯ ЕСТЬ ИДЕЯ
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
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
            </div>
        </AuthenticatedLayout>
    );
}