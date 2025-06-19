import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router, useForm } from '@inertiajs/react';

export default function ReportsToMyPosts() {
    const { user, posts, reports } = usePage().props;
    const { reload } = usePage();
    const { auth, user: profileUser } = usePage().props;
    const currentUser = auth.user;

    const Reject = (e, reportId) => {
        e.preventDefault();
        e.stopPropagation();
        router.post(route('reports.reject', { report: reportId }), {
            preserveScroll: true,
            onSuccess: () => router.reload(),
        });
    }

    const Accept = (e, reportId) => {
        e.preventDefault();
        e.stopPropagation();
        router.post(route('reports.accept', { report: reportId }), {
            preserveScroll: true,
            onSuccess: () => router.reload(),
        });
    }

    const getStatusStyles = (approved) => {
        switch (approved) {
            case 1:
                return {
                    bg: 'bg-violet-50',
                    border: 'border-green-200',
                    text: 'text-flower',
                    icon: (
                        // <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        // </svg>
                        <p className="text-[14px]">✔️</p>
                    ),
                    label: 'Принят'
                };
            case 0:
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-500',
                    icon: (
                        // <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        // </svg>
                        <p className="text-[14px]">❌</p>
                    ),
                    label: 'Отклонён'
                };
            default:
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-flower',
                    text: 'text-yellow-500',
                    icon: (
                        // <svg className="w-5 h-5 text-flower" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        // </svg>
                        <p className="text-[20px]">⏰</p>
                    ),
                    label: 'Ожидает ответа'
                };
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Мои отклики на посты`} />
            <div className="max-w-7xlmy-6 px-4 flex flex-col gap-3">
                <div className="py-8 w-full bg-gray-50 rounded-xl sm:px-6 lg:px-8 shadow-[1px_1px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.3)]">
                    <div className="flex items-center gap-5">
                        {profileUser?.path_img && (
                            <img
                                src={`/images/${profileUser.path_img}`}
                                alt="user pfp"
                                className="w-[70px] mb-1 rounded-full"
                            />
                        )}
                        <div className="w-full flex items-center justify-between">
                            <div className="flex flex-col mb-2">
                                <span className="text-[22px] font-semibold select-none text-[#57595C]">
                                    {profileUser.username}
                                </span>
                                <span className="text-[15px] mt-[-4px] select-none text-[#57595C] font-medium opacity-60">
                                    @{profileUser.login}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-wrap lg:flex-row gap-3">
                    {/* Блок постов */}
                    {reports.map((item) => {
                        const status = getStatusStyles(item.approved);
                        return (
                            <div key={item.id} className="flex flex-col justify-between p-4 w-[26vw] bg-white rounded-xl shadow-[1px_1px_3px_rgba(163,177,198,0.2),-8px_-8px_10px_rgba(255,255,255,0.2)]">
                                <div>
                                            <div className="border-l-2 border-flower p-2 pl-4 w-full mb-4">
                                            <p className="text-[14px] font-semibold text-flower">{item.post.title}</p>
                                            <p className="text-[14px] font-normal text-flower">{item.post.preview}</p>
                                        </div>
                                        <a href={route('users.posts', { login: item.user.login })}>
                                            <div className='flex items-center gap-2' onClick={(e) => { e.stopPropagation(); }}>
                                                {item.user?.path_img && (
                                                    <div>
                                                        <img
                                                            src={`/images/${item.user.path_img}`}
                                                            alt="user pfp"
                                                            className="w-[35px] rounded-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className='text-[15px] font-semibold text-[#57595C]'>{item.user.username}</p>
                                                    <p className='text-[14px] mt-[-4px] text-gray-500 font-regular opacity-80'>@{item.user.login}</p>
                                                </div>
                                                
                                            </div>
                                            {item.message ? (<p>{item.message}</p>) : (<p className="italic text-[14px] font-light text-gray-400">Пользователь не оставил сообщения</p>)}
                                        </a>
                                        </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-full h-full flex-col justify-between">
                                        <div>
                                        <div className="mt-3 flex justify-between w-full items-center">
                                            <div className="flex justify-between items-start w-full">
                                                <div className="flex flex-col items-start space-x-2">
                                                    <div className="flex items-center gap-4">
                                                        <span className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${status.bg} ${status.text}`}>
                                                            {status.icon}
                                                            <span className="ml-1 text-[14px]">{status.label}</span>
                                                        </span>
                                                        {status.label === "Принят" && (
                                                            <div className="bg-blue-500 flex items-center gap-2 py-2 px-4 rounded-md">
                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4808 3.69164C16.6867 3.60496 16.9121 3.57507 17.1335 3.60507C17.355 3.63507 17.5643 3.72386 17.7397 3.86221C17.9152 4.00056 18.0503 4.1834 18.1311 4.39171C18.2119 4.60001 18.2354 4.82617 18.1991 5.04664L16.3091 16.5108C16.1258 17.6166 14.9125 18.2508 13.8983 17.7C13.05 17.2391 11.79 16.5291 10.6566 15.7883C10.09 15.4175 8.35414 14.23 8.56748 13.385C8.75081 12.6625 11.6675 9.94747 13.3341 8.3333C13.9883 7.69914 13.69 7.3333 12.9175 7.91664C10.9991 9.36497 7.91914 11.5675 6.90081 12.1875C6.00248 12.7341 5.53414 12.8275 4.97414 12.7341C3.95248 12.5641 3.00498 12.3008 2.23164 11.98C1.18664 11.5466 1.23748 10.11 2.23081 9.69164L16.4808 3.69164Z" fill="white" />
                                                                </svg>
                                                                <a href={`https://t.me/${item.contact.replace('@', '')}`} className="text-white text-[14px]">Связаться</a>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {item.approved === null && (
                                                        <div className="mt-4 flex items-start space-x-3">
                                                            <button onClick={(e) => Accept(e, item.id)} className="inline-flex justify-center items-center px-6 py-2 bg-night border border-transparent rounded-md font-semibold text-[14px] text-white hover:bg-[#363e4f] focus:bg-[#363e4f] active:bg-[#363e4f] transition ease-in-out duration-350">
                                                                Принять
                                                            </button>
                                                            <button onClick={(e) => Reject(e, item.id)} className="flex items-center gap-2 justify-center px-6 py-2 bg-white border rounded-md font-semibold text-[14px] text-night shadow-[1px_1px_10px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.3)] hover:bg-gray-50 focus:bg-gray-50 transition ease-in-out duration-350">
                                                                Отклонить
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
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