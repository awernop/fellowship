import ApplicationLogoMini from '@/Components/ApplicationLogoMini';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ModalPost from '@/Components/modalCreate';

export default function AuthenticatedLayout({ header, children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth.user;
    const isAdmin = auth.user?.role === 'admin';

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isTopBannerVisible, setIsTopBannerVisible] = useState(true);

    const closeBanner = () => {
        setIsTopBannerVisible(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {isTopBannerVisible && (
                <div className="h-[35px] bg-gray-100 flex items-center justify-center w-full relative text-[14px]">
                    <p className="font-normal">Давайте изменим мир Вместе!</p>
                    <a href="#" className="ml-2 font-bold">Узнать больше о проекте</a>
                    <button
                        onClick={closeBanner}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 font-extrabold text-gray-500 hover:text-gray-700"
                        aria-label="Закрыть"
                    >
                        ✕
                    </button>
                </div>
            )}

            <nav className="border-b bg-white">
                <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href={user ? "/dashboard" : "/"}>
                                    <ApplicationLogoMini className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3 flex items-center gap-6">
                                {user ? (
                                    <>
                                        <a className="inline-flex items-center px-6 py-1 bg-flower border border-transparent rounded-md font-semibold text-[14px] text-white hover:bg-bloom focus:bg-bloom active:bg-bloom focus:outline-none transition ease-in-out duration-350"
                                            href={route('posts.create')}>
                                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.7916 13.5416H13.5416V19.7916H11.4583V13.5416H5.20825V11.4583H11.4583V5.20831H13.5416V11.4583H19.7916V13.5416Z" fill="white" />
                                            </svg>
                                            Новый пост
                                        </a>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-[14px] font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                    >
                                                        {user?.path_img && (
                                                            <img
                                                                src={`/images/${user.path_img}`}
                                                                alt="user pfp"
                                                                className="w-[35px]"
                                                            />
                                                        )}
                                                        <svg
                                                            className="-me-0.5 ms-2 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <div className="flex flex-col items-center justify-center mt-3">
                                                    {user?.path_img && (
                                                        <img
                                                            src={`/images/${user.path_img}`}
                                                            alt="user pfp"
                                                            className="w-[50px] mb-1"
                                                        />
                                                    )}
                                                    <div className="flex flex-col items-center mb-2">
                                                        <span className="text-[15px] font-semibold select-none">{user.username}</span>
                                                        <span className="text-[14px] mt-[-4px] select-none">@{user.login}</span>
                                                    </div>
                                                </div>
                                                {isAdmin && (
                                                    <Dropdown.Link
                                                        href={route('admin.index')}
                                                        className="bg-flower text-white hover:bg-bloom"
                                                    >
                                                        Панель администратора
                                                    </Dropdown.Link>
                                                )}
                                                <Dropdown.Link href={route('users.posts', { login: user.login })} className=' hover:bg-gray-100 focus:bg-gray-100'>
                                                    Мой профиль
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('archive')} className=' hover:bg-gray-100 focus:bg-gray-100'>
                                                    Архив 
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('user.repors')} className=' hover:bg-gray-100 focus:bg-gray-100'>
                                                    Мои отклики 
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('archive')} className=' hover:bg-gray-100 focus:bg-gray-100'>
                                                    Отклики на мои посты
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('profile.edit')} className=' hover:bg-gray-100 focus:bg-gray-100'>
                                                    Настройки профиля
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className=' hover:bg-gray-100 focus:bg-gray-100'
                                                >
                                                    Выйти
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </>
                                ) : (
                                    <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                        <div className="relative ms-3 flex gap-8 items-center">
                                            <a href="/login" className="font-medium text-[14px] leading-103 text-[#696969]">Войти</a>
                                            <a href="/register" className="inline-flex items-center rounded-lg border border-transparent bg-flower py-2 px-7 text-[14px] font-semibold text-white transition duration-150 ease-in-out hover:bg-[#564be9] focus:bg-[#564be9] focus:outline-none focus:ring-2">Создать аккаунт</a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Мобильное меню */}
                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden`}>
                    <div className="space-y-1 pb-3 pt-2">
                        {user ? (
                            <>
                                <ResponsiveNavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </ResponsiveNavLink>

                                <div className="border-t border-gray-200 pb-1 pt-4">
                                    <div className="px-4">
                                        <div className="text-base font-medium text-gray-800">
                                            {user.username}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500">
                                            {user.email}
                                        </div>
                                    </div>

                                    <div className="mt-3 space-y-1">
                                        <ResponsiveNavLink href={route('profile.edit')}>
                                            Profile
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink
                                            method="post"
                                            href={route('logout')}
                                            as="button"
                                        >
                                            Log Out
                                        </ResponsiveNavLink>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="px-4 py-2 space-y-2">
                                <ResponsiveNavLink href={route('login')}>
                                    Войти
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('register')}>
                                    Создать аккаунт
                                </ResponsiveNavLink>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main>{children}</main>

            {isModalOpen && (
                <ModalPost
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}