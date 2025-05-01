import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import ModalPost from '@/Components/ModalPost';
import DeletePostButton from '@/Components/DeletePostButton';
import { UsersList } from '@/Components/UsersList';
import { PostsList } from '@/Components/PostsList';

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
        posts: <PostsList posts={posts} />,
        users: <UsersList users={users} />,
      };

    return (
        <AuthenticatedLayout>
            <Head title="Панель администратора" />
            <div className="flex h-[calc(100vh-100px)] bg-gray-50">
                {/* Зафиксированная часть */}
                <div className="w-60 flex-shrink-0 pt-3 px-3 sticky top-0 border-r bg-white">
                    <div className='w-full'>
                        <div onClick={() => handleTabChange('users')} className='flex items-center gap-3 w-full px-4 py-2 text-start text-[15px] rounded-md leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none  hover:bg-gray-100 focus:bg-gray-100 cursor-pointer'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 17V19H2V17C2 17 2 13 9 13C16 13 16 17 16 17ZM12.5 7.50004C12.5 6.8078 12.2947 6.13111 11.9101 5.55554C11.5256 4.97997 10.9789 4.53137 10.3394 4.26646C9.69985 4.00155 8.99612 3.93224 8.31718 4.06729C7.63825 4.20234 7.01461 4.53568 6.52513 5.02516C6.03564 5.51465 5.7023 6.13829 5.56725 6.81722C5.4322 7.49615 5.50152 8.19989 5.76642 8.83943C6.03133 9.47897 6.47993 10.0256 7.0555 10.4102C7.63108 10.7948 8.30777 11 9 11C9.92826 11 10.8185 10.6313 11.4749 9.97491C12.1313 9.31853 12.5 8.42829 12.5 7.50004ZM15.94 13C16.5547 13.4758 17.0578 14.0805 17.4137 14.7715C17.7696 15.4626 17.9697 16.2233 18 17V19H22V17C22 17 22 13.37 15.94 13ZM15 4.00004C14.3118 3.99684 13.6388 4.20257 13.07 4.59004C13.6774 5.43877 14.0041 6.45632 14.0041 7.50004C14.0041 8.54375 13.6774 9.5613 13.07 10.41C13.6388 10.7975 14.3118 11.0032 15 11C15.9283 11 16.8185 10.6313 17.4749 9.97491C18.1313 9.31853 18.5 8.42829 18.5 7.50004C18.5 6.57178 18.1313 5.68154 17.4749 5.02516C16.8185 4.36879 15.9283 4.00004 15 4.00004Z" fill="#2A303E" />
</svg>
                            Пользователи
                        </div>
                        <div onClick={() => handleTabChange('posts')} className='flex items-center gap-3 w-full px-4 py-2 text-start text-[15px] rounded-md leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none  hover:bg-gray-100 focus:bg-gray-100 cursor-pointer'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 5.5H16C16.7956 5.5 17.5587 5.18393 18.1213 4.62132C18.6839 4.05871 19 3.29565 19 2.5C19 2.36739 18.9473 2.24021 18.8536 2.14645C18.7598 2.05268 18.6326 2 18.5 2H5.5C5.36739 2 5.24021 2.05268 5.14645 2.14645C5.05268 2.24021 5 2.36739 5 2.5C5 3.29565 5.31607 4.05871 5.87868 4.62132C6.44129 5.18393 7.20435 5.5 8 5.5ZM5 11.5C5 9.614 5 8.672 5.586 8.086C6.172 7.5 7.114 7.5 9 7.5H15C16.886 7.5 17.828 7.5 18.414 8.086C19 8.672 19 9.614 19 11.5V12.5C19 14.386 19 15.328 18.414 15.914C17.828 16.5 16.886 16.5 15 16.5H9C7.114 16.5 6.172 16.5 5.586 15.914C5 15.328 5 14.386 5 12.5V11.5ZM16 18.5H8C7.20435 18.5 6.44129 18.8161 5.87868 19.3787C5.31607 19.9413 5 20.7044 5 21.5C5 21.6326 5.05268 21.7598 5.14645 21.8536C5.24021 21.9473 5.36739 22 5.5 22H18.5C18.6326 22 18.7598 21.9473 18.8536 21.8536C18.9473 21.7598 19 21.6326 19 21.5C19 20.7044 18.6839 19.9413 18.1213 19.3787C17.5587 18.8161 16.7956 18.5 16 18.5Z" fill="#2A303E" />
</svg>
                            Посты
                        </div>
                        <div onClick={() => handleTabChange('reports')} className='flex items-center gap-3 w-full px-4 py-2 text-start text-[15px] rounded-md leading-5 text-gray-700 transition duration-150 ease-in-out focus:outline-none  hover:bg-gray-100 focus:bg-gray-100 cursor-pointer'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 3C19.0609 3 20.0783 3.42143 20.8284 4.17157C21.5786 4.92172 22 5.93913 22 7V15C22 16.0609 21.5786 17.0783 20.8284 17.8284C20.0783 18.5786 19.0609 19 18 19H13.276L8.514 21.857C8.37059 21.9431 8.20788 21.9918 8.04077 21.9987C7.87366 22.0056 7.70749 21.9705 7.55746 21.8966C7.40743 21.8227 7.27833 21.7123 7.18199 21.5756C7.08565 21.4389 7.02514 21.2802 7.006 21.114L7 21V19H6C4.97376 19 3.98677 18.6056 3.24319 17.8983C2.4996 17.191 2.05631 16.225 2.005 15.2L2 15V7C2 5.93913 2.42143 4.92172 3.17157 4.17157C3.92172 3.42143 4.93913 3 6 3H18ZM14 12H8C7.73478 12 7.48043 12.1054 7.29289 12.2929C7.10536 12.4804 7 12.7348 7 13C7 13.2652 7.10536 13.5196 7.29289 13.7071C7.48043 13.8946 7.73478 14 8 14H14C14.2652 14 14.5196 13.8946 14.7071 13.7071C14.8946 13.5196 15 13.2652 15 13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12ZM16 8H8C7.73478 8 7.48043 8.10536 7.29289 8.29289C7.10536 8.48043 7 8.73478 7 9C7 9.26522 7.10536 9.51957 7.29289 9.70711C7.48043 9.89464 7.73478 10 8 10H16C16.2652 10 16.5196 9.89464 16.7071 9.70711C16.8946 9.51957 17 9.26522 17 9C17 8.73478 16.8946 8.48043 16.7071 8.29289C16.5196 8.10536 16.2652 8 16 8Z" fill="#2A303E" />
</svg>
                            Отклики
                        </div>
                        <div className='flex items-center gap-3 w-full px-4 py-2 text-start text-[15px] leading-5 text-gray-700 transition rounded-md duration-150 ease-in-out focus:outline-none  hover:bg-gray-100 focus:bg-gray-100 cursor-pointer'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 17C12.2833 17 12.521 16.904 12.713 16.712C12.905 16.52 13.0007 16.2827 13 16C12.9993 15.7173 12.9033 15.48 12.712 15.288C12.5207 15.096 12.2833 15 12 15C11.7167 15 11.4793 15.096 11.288 15.288C11.0967 15.48 11.0007 15.7173 11 16C10.9993 16.2827 11.0953 16.5203 11.288 16.713C11.4807 16.9057 11.718 17.0013 12 17ZM12 13C12.2833 13 12.521 12.904 12.713 12.712C12.905 12.52 13.0007 12.2827 13 12V8C13 7.71667 12.904 7.47933 12.712 7.288C12.52 7.09667 12.2827 7.00067 12 7C11.7173 6.99933 11.48 7.09533 11.288 7.288C11.096 7.48067 11 7.718 11 8V12C11 12.2833 11.096 12.521 11.288 12.713C11.48 12.905 11.7173 13.0007 12 13ZM9.075 21C8.80833 21 8.55433 20.95 8.313 20.85C8.07167 20.75 7.859 20.6083 7.675 20.425L3.575 16.325C3.39167 16.1417 3.25 15.929 3.15 15.687C3.05 15.445 3 15.1913 3 14.926V9.076C3 8.80933 3.05 8.55533 3.15 8.314C3.25 8.07267 3.39167 7.86 3.575 7.676L7.675 3.576C7.85833 3.39267 8.071 3.251 8.313 3.151C8.555 3.051 8.809 3.00067 9.075 3H14.925C15.1917 3 15.446 3.05 15.688 3.15C15.93 3.25 16.1423 3.39167 16.325 3.575L20.425 7.675C20.6083 7.85833 20.75 8.071 20.85 8.313C20.95 8.555 21 8.809 21 9.075V14.925C21 15.1917 20.95 15.446 20.85 15.688C20.75 15.93 20.6083 16.1423 20.425 16.325L16.325 20.425C16.1417 20.6083 15.929 20.75 15.687 20.85C15.445 20.95 15.191 21 14.925 21H9.075Z" fill="#2A303E" />
</svg>
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