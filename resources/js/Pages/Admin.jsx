import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { UsersList } from '@/Components/UsersList';
import { PostsList } from '@/Components/PostsList';
import { ReportsList } from '@/Components/ReportsList';

export default function Archive() {
    const { users, posts, reports, initialTab } = usePage().props;
    const [activeTab, setActiveTab] = useState(initialTab || 'users');
    const [displayFormat, setDisplayFormat] = useState('cards');

    useEffect(() => {
        if (initialTab) {
            setActiveTab(initialTab);
        }
    }, [initialTab]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        router.get(route('admin.index'), { tab }, {
            preserveState: true,
            replace: true
        });
    };

    const TAB_COMPONENTS = {
        posts: <PostsList posts={posts} format={displayFormat} />,
        users: <UsersList users={users} format={displayFormat} />,
        reports: <ReportsList reports={reports} format={displayFormat} />,
    };

    const getTabClass = (tabName) => {
        return `flex items-center gap-3 w-full px-4 py-2 text-start text-[15px] leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer ${
            activeTab === tabName 
                ? 'bg-white border-t border-l border-r rounded-t-lg font-medium text-[#6F7275]' 
                : 'text-[#6F7275] font-medium'
        }`;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Панель администратора" />
            <div className="flex flex-col h-full">
                <div className="w-full flex pt-3 px-3 ">
                    <div className='w-full flex '>
                        <div 
                            onClick={() => handleTabChange('users')} 
                            className={getTabClass('users')}
                        >
                            <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.6669 7.26074L15.7421 7.27734L16.5175 7.50586C18.2551 8.05434 19.4962 8.71128 20.3369 9.67383C21.3097 10.7879 21.645 12.1956 21.789 13.9385L21.8564 14.75H13.1074L13.3095 13.8379C13.6371 12.3615 13.6302 11.4978 13.248 10.8867C12.887 10.3096 12.0618 9.75712 10.1855 9.30078L9.79584 9.21094C8.01327 8.81971 6.14501 8.90104 4.43256 9.48633C2.66406 10.0908 1.96404 10.685 1.68744 11.2441C1.44171 11.7412 1.44225 12.3767 1.66107 13.3672L1.76849 13.8145L1.78314 13.8896C1.83953 14.2655 1.60357 14.6303 1.22748 14.7266C0.851175 14.8228 0.468635 14.6158 0.33783 14.2588L0.315369 14.1855L0.201111 13.7158C-0.0446904 12.6208 -0.135694 11.548 0.342713 10.5801C0.893897 9.4651 2.08836 8.70178 3.9472 8.06641C5.9335 7.38752 8.08174 7.29845 10.1171 7.74512L10.5234 7.83887C12.5116 8.31994 13.8357 8.99806 14.5195 10.0908C15.0998 11.0186 15.123 12.102 14.9453 13.25H20.2031C20.0383 12.0656 19.7427 11.2736 19.207 10.6602C18.6276 9.9968 17.6932 9.45218 16.0771 8.94043L15.3417 8.72266L15.2685 8.69824C14.9144 8.56017 14.7156 8.17395 14.8193 7.7998C14.923 7.42571 15.2923 7.19683 15.6669 7.26074ZM7.54193 0C9.47478 0.000176772 11.0419 1.56711 11.0419 3.5C11.0419 5.43289 9.47478 6.99982 7.54193 7C5.60893 7 4.04193 5.433 4.04193 3.5C4.04193 1.567 5.60893 0 7.54193 0ZM13.7216 0.00488281C15.5709 0.0986811 17.041 1.62745 17.041 3.5L17.037 3.67969C16.9435 5.52918 15.4137 7 13.541 7L13.3681 6.99512C11.7758 6.90716 12.439 5.5635 12.5312 3.85742L12.5419 3.5C12.5419 1.5672 11.6087 0.00031208 13.541 0L13.7216 0.00488281ZM7.54193 1.5C6.43736 1.5 5.54193 2.39543 5.54193 3.5C5.54193 4.60457 6.43736 5.5 7.54193 5.5C8.64635 5.49982 9.54193 4.60446 9.54193 3.5C9.54193 2.39554 8.64635 1.50018 7.54193 1.5ZM13.912 1.93457C13.9697 2.35595 14.0419 2.90528 14.0419 3.5C14.0419 4.09472 13.9697 4.64405 13.912 5.06543C13.8902 5.22533 13.8728 5.35875 13.8583 5.47168C14.812 5.31958 15.541 4.49654 15.541 3.5C15.541 2.50341 14.8121 1.67938 13.8583 1.52734C13.8728 1.64048 13.8901 1.77421 13.912 1.93457Z" 
                                fill="#6F7275" />
                            </svg>
                            Пользователи
                        </div>
                        <div 
                            onClick={() => handleTabChange('posts')} 
                            className={getTabClass('posts')}
                        >
                            <svg width="17" height="20" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 16.75C14.8472 16.75 16.75 18.6528 16.75 21C16.75 21.4142 16.4142 21.75 16 21.75C15.5858 21.75 15.25 21.4142 15.25 21C15.25 19.4812 14.0188 18.25 12.5 18.25H5C3.48122 18.25 2.25 19.4812 2.25 21C2.25 21.4142 1.91421 21.75 1.5 21.75C1.08579 21.75 0.75 21.4142 0.75 21C0.75 18.6528 2.65279 16.75 5 16.75H12.5ZM11.75 7C14.0972 7 16 8.90279 16 11.25C16 13.5972 14.0972 15.5 11.75 15.5H5.75C3.40279 15.5 1.5 13.5972 1.5 11.25C1.5 8.90279 3.40279 7 5.75 7H11.75ZM5.75 8.5C4.23122 8.5 3 9.73122 3 11.25C3 12.7688 4.23122 14 5.75 14H11.75C13.2688 14 14.5 12.7688 14.5 11.25C14.5 9.73122 13.2688 8.5 11.75 8.5H5.75ZM16 0.25C16.4142 0.25 16.75 0.585786 16.75 1C16.75 3.62335 14.6234 5.75 12 5.75H5.5C2.87665 5.75 0.75 3.62335 0.75 1C0.75 0.585786 1.08579 0.25 1.5 0.25C1.91421 0.25 2.25 0.585786 2.25 1C2.25 2.79492 3.70507 4.25 5.5 4.25H12C13.7949 4.25 15.25 2.79493 15.25 1C15.25 0.585786 15.5858 0.25 16 0.25Z" 
                                fill="#6F7275"/>
                            </svg>
                            Посты
                        </div>
                        <div 
                            onClick={() => handleTabChange('reports')} 
                            className={getTabClass('reports')}
                        >
                            <svg width="23" height="19" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.5 0.25C19.6756 0.25 22.25 2.82436 22.25 6V12C22.25 15.1756 19.6756 17.75 16.5 17.75H12.2021L6.37793 21.1475L5.25 21.8057V17.833C5.24982 17.7872 5.21276 17.7502 5.16699 17.75C2.45159 17.75 0.25 15.5484 0.25 12.833V6C0.25 2.82436 2.82436 0.25 6 0.25H16.5ZM6 1.75C3.65279 1.75 1.75 3.65279 1.75 6V12.833C1.75 14.72 3.28002 16.25 5.16699 16.25C6.04118 16.2502 6.74982 16.9588 6.75 17.833V19.1943L11.6221 16.3525L11.7969 16.25H16.5C18.8472 16.25 20.75 14.3472 20.75 12V6C20.75 3.65279 18.8472 1.75 16.5 1.75H6ZM13.5 10.25C13.9142 10.25 14.25 10.5858 14.25 11C14.25 11.4142 13.9142 11.75 13.5 11.75H6.5C6.08579 11.75 5.75 11.4142 5.75 11C5.75 10.5858 6.08579 10.25 6.5 10.25H13.5ZM15.5 6.25C15.9142 6.25 16.25 6.58579 16.25 7C16.25 7.41421 15.9142 7.75 15.5 7.75H6.5C6.08579 7.75 5.75 7.41421 5.75 7C5.75 6.58579 6.08579 6.25 6.5 6.25H15.5Z" 
                                fill="#6F7275" />
                            </svg>
                            Отклики
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setDisplayFormat('cards')}
                            className={`p-2 ${displayFormat === 'cards' ? 'bg-white border text-night rounded-t-md' : 'text-gray-500 hover:bg-gray-100'}`}
                            title="Карточки"
                        >
                            <svg width="22" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5 11.5H7C6.71667 11.5 6.47933 11.404 6.288 11.212C6.09667 11.02 6.00067 10.7827 6 10.5V7C6 6.71667 6.096 6.47933 6.288 6.288C6.48 6.09667 6.71733 6.00067 7 6H10.5C10.7833 6 11.021 6.096 11.213 6.288C11.405 6.48 11.5007 6.71733 11.5 7V10.5C11.5 10.7833 11.404 11.021 11.212 11.213C11.02 11.405 10.7827 11.5007 10.5 11.5ZM10.5 18H7C6.71667 18 6.47933 17.904 6.288 17.712C6.09667 17.52 6.00067 17.2827 6 17V13.5C6 13.2167 6.096 12.9793 6.288 12.788C6.48 12.5967 6.71733 12.5007 7 12.5H10.5C10.7833 12.5 11.021 12.596 11.213 12.788C11.405 12.98 11.5007 13.2173 11.5 13.5V17C11.5 17.2833 11.404 17.521 11.212 17.713C11.02 17.905 10.7827 18.0007 10.5 18ZM17 11.5H13.5C13.2167 11.5 12.9793 11.404 12.788 11.212C12.5967 11.02 12.5007 10.7827 12.5 10.5V7C12.5 6.71667 12.596 6.47933 12.788 6.288C12.98 6.09667 13.2173 6.00067 13.5 6H17C17.2833 6 17.521 6.096 17.713 6.288C17.905 6.48 18.0007 6.71733 18 7V10.5C18 10.7833 17.904 11.021 17.712 11.213C17.52 11.405 17.2827 11.5007 17 11.5ZM17 18H13.5C13.2167 18 12.9793 17.904 12.788 17.712C12.5967 17.52 12.5007 17.2827 12.5 17V13.5C12.5 13.2167 12.596 12.9793 12.788 12.788C12.98 12.5967 13.2173 12.5007 13.5 12.5H17C17.2833 12.5 17.521 12.596 17.713 12.788C17.905 12.98 18.0007 13.2173 18 13.5V17C18 17.2833 17.904 17.521 17.712 17.713C17.52 17.905 17.2827 18.0007 17 18ZM5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5ZM5 19H19V5H5V19Z"
                                    fill={displayFormat === 'table' ? "#C4C4C4" : "#6F7275"} />
                            </svg>
                        </button>
                        <button
                            onClick={() => setDisplayFormat('table')}
                            className={`p-2 rounded-md ${displayFormat === 'table' ? 'bg-white border text-night rounded-t-md' : 'text-gray-500 hover:bg-gray-100'}`}
                            title="Таблица"
                        >
                            <svg width="22" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 21C3.71667 21 3.47933 20.904 3.288 20.712C3.09667 20.52 3.00067 20.2827 3 20V17.35C3 17.0667 3.096 16.8293 3.288 16.638C3.48 16.4467 3.71733 16.3507 4 16.35H20C20.2833 16.35 20.521 16.446 20.713 16.638C20.905 16.83 21.0007 17.0673 21 17.35V20C21 20.2833 20.904 20.521 20.712 20.713C20.52 20.905 20.2827 21.0007 20 21H4ZM4 14.35C3.71667 14.35 3.47933 14.254 3.288 14.062C3.09667 13.87 3.00067 13.6327 3 13.35V10.625C3 10.3417 3.096 10.1043 3.288 9.913C3.48 9.72167 3.71733 9.62567 4 9.625H20C20.2833 9.625 20.521 9.721 20.713 9.913C20.905 10.105 21.0007 10.3423 21 10.625V13.35C21 13.6333 20.904 13.871 20.712 14.063C20.52 14.255 20.2827 14.3507 20 14.35H4ZM4 7.625C3.71667 7.625 3.47933 7.529 3.288 7.337C3.09667 7.145 3.00067 6.908 3 6.626V4C3 3.71667 3.096 3.47933 3.288 3.288C3.48 3.09667 3.71733 3.00067 4 3H20C20.2833 3 20.521 3.096 20.713 3.288C20.905 3.48 21.0007 3.71733 21 4V6.625C21 6.90833 20.904 7.146 20.712 7.338C20.52 7.53 20.2827 7.62567 20 7.625H4Z"
                                    fill={displayFormat === 'cards' ? "#C4C4C4" : "#6F7275"} />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col flex-wrap gap-3 overflow-y-auto p-6 w-full bg-white border rounded-xl sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-3 w-full overflow-y-auto">
                        {TAB_COMPONENTS[activeTab]}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}