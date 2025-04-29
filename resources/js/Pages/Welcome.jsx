import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import ModalPost from '@/Components/ModalPost';
import GuestMainLayout from '../Layouts/GuestMainLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Post } from '@/Components/Post';


export default function Welcome({posts}) {

    const [activePost, setActivePost] = useState(null);
    const [modalType, setModalType] = useState(null);

    const handlePostClick = (post, type) => {
        setActivePost(post);
        setModalType(type);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Главная" />
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
