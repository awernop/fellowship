import React, { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, useForm, Link } from '@inertiajs/react';
import UserSideNavigation from "@/Components/UserSideNavigation";
import Modal from "@/Components/Modal";

export default function MyReports() {
    const { user, posts, reports } = usePage().props;
    const [displayFormat, setDisplayFormat] = useState('cards');

    const getStatusStyles = (approved) => {
        switch (approved) {
            case true:
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    text: 'text-green-800',
                    icon: (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ),
                    label: 'Принят'
                };
            case false:
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-800',
                    icon: (
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ),
                    label: 'Отклонён'
                };
            default:
                return {
                    bg: 'bg-[#eeedff]',
                    border: 'border-flower',
                    text: 'text-flower',
                    icon: (
                        <svg className="w-5 h-5 text-flower" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    label: 'Ожидает ответа'
                };
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Мои отклики на посты`} />
            <div className="flex h-[calc(100vh-100px)] bg-gray-50">
                {/* Зафиксированная часть */}
                <div className="w-60 flex-shrink-0 pt-3 sticky top-0 border-r bg-white">
                    <UserSideNavigation />
                </div>
                {/* Часть с прокруткой */}
                <div className="flex flex-col flex-wrap gap-3 w-full overflow-y-auto">
                    <div className='flex items-center justify-between w-full px-9 p-6'>
                        <div>
                            <p className='text-[22px] font-semibold'>Ваши отклики</p>
                            <p className='text-[15px] font-normal'>Здесь хранится история ваших взаимодействий с постами других пользователей</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="flex flex-wrap items-start gap-3 gap-y-3 overflow-hidden sm:rounded-lg">
                                {reports.map((item) => {
                                            const status = getStatusStyles(item.approved);
                                            return (
                                                <div key={item.id} className="flex flex-col p-4 border-b w-[360px] bg-white rounded-md ">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-full">
                                                            <div className="bg-[#EEEDFF] p-2 pl-4 w-full rounded-md mb-4">
                                                                <p className="text-[14px] font-medium text-flower">{item.post.title}</p>
                                                                <p className="text-[14px] font-normal text-flower">{item.post.preview}</p>
                                                            </div>
                                                            <div className="">
                                                                <p className="text-[18px] mt-[-4px] font-semibold">{item.user.username} (это вы)</p>
                                                                <p className="text-[15px] mt-[-4px]">@{item.user.login}</p>
                                                            </div>
                                                            {item.message ? (<p>{item.message}</p>) : (<p className="italic text-[14px] font-light text-gray-400">Вы не оставили сообщения</p>)}
                                                            <div className="mt-3 flex justify-between w-full items-center">
                                                                <div className="flex justify-between items-start w-full">
                                                                    <div className="flex items-center space-x-2">
                                                                        <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${status.bg} ${status.text}`}>
                                                                            {status.icon}
                                                                            <span className="ml-1">{status.label}</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        )
                                        }
                                </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}