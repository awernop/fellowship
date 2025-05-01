import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import ModalPost from '@/Components/ModalPost';
import DeletePostButton from '@/Components/DeletePostButton';
import { UsersList } from '@/Components/UsersList';

export default function Archive() {
    const { users, posts, reports, initialTab } = usePage().props;
    const [activeTab, setActiveTab] = useState('users');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        router.get(route('admin.index'), { tab }, {
            preserveState: true,
            replace: true
        });
    };

    const TAB_COMPONENTS = {
        // posts: <PostsList posts={posts} />,
        users: <UsersList users={users} />,
      };

    return (
        <AuthenticatedLayout>
            <Head title="Панель администратора" />
            <div className="flex h-[calc(100vh-100px)] bg-gray-50">
                {/* Зафиксированная часть */}
                <div className="w-60 flex-shrink-0 p-6 sticky top-0 border-r bg-white">
                    <div>
                        <div onClick={() => handleTabChange('users')} className='block w-full px-4 py-2 text-start text-[15px] leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none  hover:bg-gray-100 focus:bg-gray-100 cursor-pointer'>
                            Пользователи
                        </div>
                        <div onClick={() => handleTabChange('posts')} className='block w-full px-4 py-2 text-start text-[15px] leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none  hover:bg-gray-100 focus:bg-gray-100 cursor-pointer'>
                            Посты
                        </div>
                        <div onClick={() => handleTabChange('reports')} className='block w-full px-4 py-2 text-start text-[15px] leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none  hover:bg-gray-100 focus:bg-gray-100 cursor-pointer'>
                            Отклики
                        </div>
                        <div className='block w-full px-4 py-2 text-start text-[15px] leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none  hover:bg-gray-100 focus:bg-gray-100 cursor-pointer'>
                            Жалобы
                        </div>
                    </div>
                </div>
                {/* Часть с прокруткой */}
                <div className="flex flex-wrap  gap-3 p-6 overflow-y-auto">
                {TAB_COMPONENTS[activeTab]}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}