import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import ModalPost from '@/Components/ModalPost';
import GuestMainLayout from '../Layouts/GuestMainLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Post } from '@/Components/Post';
import { PostGuest } from '@/Components/PostGuest';
import SideNavigation from '@/Components/SideNavigation';


export default function Welcome({posts}) {
    const [displayFormat, setDisplayFormat] = useState('cards');

    return (
        <AuthenticatedLayout>
            <Head title="Главная" />
                        <div className="flex h-[calc(100vh-100px)] bg-gray-100">
                                        {/* Зафиксированная часть */}
                                        <div className="w-55 flex-shrink-0 pt-3 sticky top-0 border m-2 bg-white rounded-3xl">
                                            <SideNavigation />
                                        </div>
                                        {/* Часть с прокруткой */}
                                        <div className="flex flex-col gap-3 w-full overflow-y-auto pb-10">
                                            
                                        </div>
                        
                                    </div>
        </AuthenticatedLayout>
    );
}
