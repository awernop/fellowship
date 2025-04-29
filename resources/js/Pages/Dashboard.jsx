import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import ModalPost from '@/Components/ModalPost';
import { Post } from '@/Components/Post';

export default function Dashboard({ posts }) {
    return (
        <AuthenticatedLayout>
            <Head title="Главная" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-3 gap-y-3 overflow-hidden sm:rounded-lg">
                        {posts.filter(post => !post.archived).map((item) => (
                            <Post post={item} key={item.id}/>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}