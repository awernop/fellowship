import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from '@inertiajs/react';

export default function MyReports() {
    const { auth, user: profileUser, reports } = usePage().props;
    const currentUser = auth.user;

    const getStatusStyles = (approved) => {
        switch (approved) {
            case 1:
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    text: 'text-green-500',
                    icon: (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ),
                    label: 'Принят'
                };
            case 0:
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-500',
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
            <div className="max-w-7xlmy-6 px-4 flex flex-col gap-3">
                <div className="py-8 w-full bg-white border rounded-xl sm:px-6 lg:px-8">
                    <div className="flex items-center gap-5">
                        {profileUser?.path_img && (
                            <img
                                src={`/images/${profileUser.path_img}`}
                                alt="user pfp"
                                className="w-[70px] mb-1 rounded-lg"
                            />
                        )}
                        <div className="w-full flex items-center justify-between">
                            <div className="flex flex-col mb-2">
                                <span className="text-[22px] font-semibold select-none text-[#57595C]">
                                    {profileUser.username}
                                </span>
                                <span className="text-[15px] mt-[-4px] font-medium select-none text-gray-500">
                                    @{profileUser.login}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-3">
                    {/* Блок постов */}
                    {reports.map((item) => {
                        const status = getStatusStyles(item.approved);
                        return (
                            <div key={item.id} className="flex flex-col p-4 border w-[360px] bg-white rounded-xl ">
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
        </AuthenticatedLayout>
    );
}