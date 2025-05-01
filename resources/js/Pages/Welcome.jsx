import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import ModalPost from '@/Components/ModalPost';
import GuestMainLayout from '../Layouts/GuestMainLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Post } from '@/Components/Post';
import { PostGuest } from '@/Components/PostGuest';


export default function Welcome({posts}) {

    const [activePost, setActivePost] = useState(null);
    const [modalType, setModalType] = useState(null);

    return (
        <AuthenticatedLayout>
            <Head title="Главная" />
                        <div className="py-12">
                                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                            <div className="flex flex-wrap gap-3 gap-y-3 overflow-hidden sm:rounded-lg">
                                                {posts.filter(post => !post.archived).map((item) => (
                                                    <PostGuest post={item} key={item.id}/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
        </AuthenticatedLayout>
    );
}
