import { Link, usePage } from "@inertiajs/react";
import ApplicationLogoMini from "./ApplicationLogoMini";
import Dropdown from "./Dropdown";
import { useState } from "react";

export default function SideNavigation() {
    const { auth, url } = usePage().props;
    const user = auth.user;
    const isAdmin = auth.user?.role === 'admin';

    const isActive = (routeName) => {
        return route().current(routeName);
    };

    const isActiveURL = (route) => {
        return url.startsWith(route);
    };

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isTopBannerVisible, setIsTopBannerVisible] = useState(true);

    return (
        <div className='w-full'>
            <div className='w-full border-b px-3 pb-3'>
                <div className="m-3">
                    <Link href={user ? "/dashboard" : "/"}>
                        <ApplicationLogoMini className="block h-9 w-auto fill-current text-gray-800" />
                    </Link>
                </div>
                {user ? (
                    <div className="mb-3 w-full ">
                        <Dropdown>
                            <Dropdown.Trigger>
                                    <div className="flex items-center justify-between rounded-xl border w-full bg-[#F8F7FB] opacity-80 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-50 px-3 py-4">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent text-[14px] font-medium leading-4 text-gray-400 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                        >
                                            <div className="w-full flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {user?.path_img && (
                                                    <img
                                                        src={`/images/${user.path_img}`}
                                                        alt="user pfp"
                                                        className="w-[35px] rounded-md"
                                                    />
                                                )}
                                                <div className="flex flex-col items-start">
                                                    <p className="font-semibold text-night">{user.username}</p>
                                                    <p className="font-regular text-gray-500 text-[13px]">@{user.login}</p>
                                                </div>
                                            </div>
                                        </div>
                                        </button>
                                    <svg width="9" height="13" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.70721 8.70711C9.09773 8.31658 9.09773 7.68342 8.70721 7.29289L2.34325 0.928932C1.95272 0.538408 1.31956 0.538408 0.929032 0.928932C0.538508 1.31946 0.538508 1.95262 0.929032 2.34315L6.58589 8L0.929032 13.6569C0.538508 14.0474 0.538508 14.6805 0.929032 15.0711C1.31956 15.4616 1.95272 15.4616 2.34325 15.0711L8.70721 8.70711ZM8 8V9H8.0001V8V7H8V8Z" fill="#c4c4c4" />
                                    </svg>
                                    </div>
                                </Dropdown.Trigger>

                            <Dropdown.Content>
                                <div className="flex flex-col items-center justify-center mt-3 pt-4">
                                    {user?.path_img && (
                                        <img
                                            src={`/images/${user.path_img}`}
                                            alt="user pfp"
                                            className="w-[50px] mb-1 rounded-xl"
                                        />
                                    )}
                                    <div className="flex flex-col items-center mb-2">
                                        <span className="text-[15px] font-semibold select-none text-[#57595C]">{user.username}</span>
                                        <span className="text-[14px] mt-[-4px] font-medium opacity-60 select-none text-[#6F7275]">@{user.login}</span>
                                    </div>
                                </div>
                                {isAdmin && (
                                    <Dropdown.Link
                                        href={route('admin.index')}
                                        className="bg-flower text-white hover:bg-bloom"
                                    >
                                        Админ
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
                                <Dropdown.Link href={route('user.reportsposts')} className=' hover:bg-gray-100 focus:bg-gray-100'>
                                    Отклики на мои посты
                                </Dropdown.Link>
                                {/* <Dropdown.Link href={route('profile.edit')} className=' hover:bg-gray-100 focus:bg-gray-100'>
                                    Настройки профиля
                                </Dropdown.Link> */}
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className=' hover:bg-gray-100 focus:bg-gray-100 hover:rounded-b-xl focus:rounded-3xl'
                                >
                                    Выйти
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                )
                    :
                    (
                        <div className="mb-3 w-full">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <div className="flex items-center justify-between rounded-xl border w-full bg-[#F8F7FB] opacity-80 cursor-pointer hover:bg-gray-50 px-3 py-4 shadow-[1px_1px_3px_rgba(163,177,198,0.3),-5px_-5px_10px_rgba(255,255,255,0.8)] hover:shadow-[1px_1px_6px_rgba(163,177,198,0.5),-5px_-5px_10px_rgba(255,255,255,0.8)] transition-all duration-200">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent text-[14px] font-medium leading-4 text-[#83858d] transition duration-150 ease-in-out focus:outline-none"
                                        >
                                            Войти
                                        </button>
                                        <svg width="9" height="13" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.70721 8.70711C9.09773 8.31658 9.09773 7.68342 8.70721 7.29289L2.34325 0.928932C1.95272 0.538408 1.31956 0.538408 0.929032 0.928932C0.538508 1.31946 0.538508 1.95262 0.929032 2.34315L6.58589 8L0.929032 13.6569C0.538508 14.0474 0.538508 14.6805 0.929032 15.0711C1.31956 15.4616 1.95272 15.4616 2.34325 15.0711L8.70721 8.70711ZM8 8V9H8.0001V8V7H8V8Z" fill="#c4c4c4" />
                                        </svg>
                                    </div>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={"/register"} className=' rounded-t-xl hover:bg-gray-100 focus:bg-gray-100'>
                                        Создать аккаунт
                                    </Dropdown.Link>
                                    <Dropdown.Link href={"/login"} className='rounded-b-xl hover:bg-gray-100 focus:bg-gray-100'>
                                        Войти
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    )

                }
                <Link href={user ? "/dashboard" : "/"} className={`flex items-center gap-3 w-full px-4 py-2 text-start text-[14px] font-medium rounded-xl leading-5 ease-in-out focus:outline-none cursor-pointer
              transition-all duration-200 ${isActive("dashboard") || isActive("posts.welcome") ? "bg-night text-white hover:bg-night focus:bg-night" : "text-[#6F7275] hover:bg-[#F0EDFF] focus:bg-[#F0EDFF]"
                    }`}>
                    <svg width="18" height="18" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 12H10C11.1046 12 12 12.8954 12 14V18C12 19.1046 12.8954 20 14 20H16.5C17.6046 20 18.5 19.1046 18.5 18V8.07037C18.5 7.40166 18.1658 6.7772 17.6094 6.40627L10.6417 1.76115C9.95376 1.3025 9.05447 1.31449 8.37896 1.79132L1.84663 6.40238C1.31573 6.77713 1 7.38647 1 8.03631V18C1 19.1046 1.89543 20 3 20H5.5C6.60457 20 7.5 19.1046 7.5 18V14C7.5 12.8954 8.39543 12 9.5 12Z" stroke-width="1.5" stroke-linecap="round"
                            stroke={isActive("dashboard") || isActive("posts.welcome") ? "#ffffff" : "#6F7275"} />
                    </svg>
                    Главная
                </Link>
                <Link href="/challenges" className={`flex items-center gap-3 w-full px-4 py-2 text-start text-[14px] font-medium rounded-xl leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer ${isActive("posts.guest") ? "bg-night text-white hover:bg-[#363e4f] focus:bg-[#363e4f]" : "text-[#6F7275] hover:bg-[#F0EDFF] focus:bg-[#F0EDFF]"
                    }`}>
                    <svg width="18" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.75 16.5C14.0972 16.5 16 18.4028 16 20.75C16 21.1642 15.6642 21.5 15.25 21.5C14.8358 21.5 14.5 21.1642 14.5 20.75C14.5 19.2312 13.2688 18 11.75 18H4.25C2.73122 18 1.5 19.2312 1.5 20.75C1.5 21.1642 1.16421 21.5 0.75 21.5C0.335786 21.5 0 21.1642 0 20.75C0 18.4028 1.90279 16.5 4.25 16.5H11.75ZM11 6.75C13.3472 6.75 15.25 8.65279 15.25 11C15.25 13.3472 13.3472 15.25 11 15.25H5C2.65279 15.25 0.75 13.3472 0.75 11C0.75 8.65279 2.65279 6.75 5 6.75H11ZM5 8.25C3.48122 8.25 2.25 9.48122 2.25 11C2.25 12.5188 3.48122 13.75 5 13.75H11C12.5188 13.75 13.75 12.5188 13.75 11C13.75 9.48122 12.5188 8.25 11 8.25H5ZM15.25 0C15.6642 0 16 0.335786 16 0.75C16 3.37335 13.8734 5.5 11.25 5.5H4.75C2.12665 5.5 0 3.37335 0 0.75C0 0.335786 0.335786 0 0.75 0C1.16421 0 1.5 0.335786 1.5 0.75C1.5 2.54493 2.95507 4 4.75 4H11.25C13.0449 4 14.5 2.54493 14.5 0.75C14.5 0.335786 14.8358 0 15.25 0Z"
                            fill={isActive("posts.guest") ? "#ffffff" : "#6F7275"} />
                    </svg>
                    Вызовы
                </Link>
                {/* <Link href='#' className='flex items-center gap-3 w-full px-4 py-2 text-start text-[15px] font-medium rounded-md leading-5 text-night transition duration-150 ease-in-out focus:outline-none  hover:bg-[#f8ffd6] focus:bg-[#f8ffd6] cursor-pointer '>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 2.74512C10.0896 5.6296 12.3695 7.91017 15.2539 9C12.3698 10.0897 10.0897 12.3698 9 15.2539C7.91017 12.3695 5.6296 10.0896 2.74512 9C5.62988 7.9103 7.9103 5.62988 9 2.74512Z"
                            stroke="#2A303E" stroke-width="1.4" />
                    </svg>
                    О проекте
                </Link> */}
            </div>
            <div className="border-b">
                <p className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Темы</p>
                <div className='w-full px-3 pb-3'>
                    <Link href={route('tags.show', 'comics')} className={`flex items-center gap-3 w-full px-4 py-2 text-start text-[14px] font-medium rounded-xl leading-5  transition duration-150 ease-in-out focus:outline-none cursor-pointer ${isActiveURL("tags/comics") ? "bg-night text-white hover:bg-[#363e4f] focus:bg-[#363e4f]" : "text-[#6F7275] hover:bg-[#F0EDFF] focus:bg-[#F0EDFF]"
                        }`}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.34961 15.9082C1.49596 15.9082 1.6449 15.9689 1.76074 16.0908C1.87781 16.2141 1.9502 16.3891 1.9502 16.5791C1.95016 16.7691 1.87779 16.9442 1.76074 17.0674C1.64492 17.1892 1.49591 17.25 1.34961 17.25C1.20348 17.2499 1.05516 17.1891 0.939453 17.0674C0.822405 16.9442 0.750039 16.7691 0.75 16.5791C0.75 16.3891 0.822373 16.2141 0.939453 16.0908C1.05518 15.969 1.20341 15.9083 1.34961 15.9082ZM5.84961 13.0654C6.23466 13.0654 6.61284 13.2268 6.89746 13.5264C7.18316 13.8273 7.34961 14.2434 7.34961 14.6846C7.34952 15.1257 7.18325 15.5419 6.89746 15.8428C6.61285 16.1423 6.23462 16.3027 5.84961 16.3027C5.46478 16.3026 5.08724 16.1421 4.80273 15.8428C4.51695 15.5419 4.3497 15.1257 4.34961 14.6846L4.35742 14.5205C4.39318 14.1411 4.55261 13.7897 4.80273 13.5264C5.05176 13.2642 5.37196 13.1081 5.70605 13.0732L5.84961 13.0654ZM12.1504 0.75C13.5176 0.750198 14.6992 1.79164 14.9482 3.21777L15.0195 3.62695L15.4043 3.7832C15.9382 4.00057 16.4035 4.38538 16.7354 4.89355C17.026 5.33878 17.2012 5.85886 17.2412 6.40039L17.25 6.63281C17.2497 7.45054 16.9401 8.2278 16.4014 8.79492C15.8684 9.3557 15.1558 9.66345 14.4199 9.66895L13.7783 9.6084L13.4375 9.5752L13.1904 9.81152C12.6568 10.3194 11.9814 10.6182 11.25 10.6182C10.4066 10.6182 9.64689 10.2477 9.13086 9.61523L8.5498 8.90332L7.96875 9.61523C7.45271 10.2477 6.69298 10.6182 5.84961 10.6182C4.48251 10.618 3.30088 9.57733 3.05176 8.15137L2.98047 7.74219L2.5957 7.58496L2.39844 7.49609C1.94715 7.26986 1.55494 6.91926 1.26465 6.47461C0.932931 5.96647 0.751791 5.36107 0.75 4.7373C0.75 3.91913 1.0596 3.14163 1.59863 2.57422C2.06909 2.07901 2.67928 1.77915 3.32227 1.71191L3.59961 1.69727C3.77288 1.69727 3.94222 1.71816 4.17773 1.75488L4.54199 1.81152L4.80957 1.55664C5.34324 1.04875 6.01863 0.75 6.75 0.75C7.59337 0.75 8.35311 1.12044 8.86914 1.75293L9.4502 2.46582L10.0312 1.75293C10.5473 1.12053 11.3071 0.75 12.1504 0.75Z"
                                stroke={isActiveURL("tags/comics") ? "#ffffff" : "#6F7275"} stroke-width="1.5" />
                        </svg>
                        Комиксы
                    </Link>
                    <Link href={route('tags.show', 'science')} className={`flex items-center gap-3 w-full px-4 py-2 text-start text-[14px] font-medium rounded-xl leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer ${isActiveURL("tags/science") ? "bg-night text-white hover:bg-[#363e4f] focus:bg-[#363e4f]" : "text-[#6F7275] hover:bg-[#F0EDFF] focus:bg-[#F0EDFF] "}`}>
                        <svg width="18" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.16208 1.74017C3.81276 0.386483 6.82735 0.824128 9.94919 2.64642C13.2161 0.739554 16.366 0.348958 17.958 1.94037L18.1582 2.16205C19.5119 3.81285 19.0735 6.82707 17.2509 9.94915C19.1583 13.2162 19.5504 16.3658 17.959 17.9579L17.7373 18.1591C16.0862 19.5129 13.0706 19.074 9.94821 17.2509C6.68145 19.1579 3.5323 19.5504 1.9404 17.9589L1.7402 17.7372C0.386427 16.0862 0.823323 13.0696 2.64645 9.9472C0.740323 6.68057 0.349804 3.53195 1.94137 1.94037L2.16208 1.74017ZM3.57321 11.3759C3.25271 11.996 2.99835 12.5996 2.81344 13.1728C2.16612 15.1798 2.47391 16.3694 3.00192 16.8974C3.53008 17.4253 4.71982 17.7332 6.72653 17.0859C7.29967 16.901 7.90247 16.6456 8.52243 16.3251C7.75916 15.7794 7.00045 15.1556 6.26559 14.4579L5.84762 14.0517C4.98386 13.1879 4.22301 12.285 3.57321 11.3759ZM16.3252 11.3759C15.6754 12.2849 14.9154 13.188 14.0517 14.0517L13.6338 14.4579C12.8988 15.1557 12.1393 15.7794 11.3759 16.3251C11.9961 16.6457 12.5995 16.9009 13.1728 17.0859C15.1793 17.733 16.3693 17.4252 16.8974 16.8974C17.4252 16.3693 17.733 15.1793 17.0859 13.1728C16.901 12.5995 16.6457 11.996 16.3252 11.3759ZM9.94919 4.41205C8.93164 5.08246 7.89883 5.91748 6.90817 6.90814C5.91752 7.8988 5.08247 8.93161 4.41208 9.94915C5.08251 10.9668 5.91743 12.0004 6.90817 12.9911C7.8983 13.9813 8.9312 14.8151 9.94821 15.4853C10.9658 14.8149 12.0004 13.9819 12.9912 12.9911C13.9819 12.0004 14.8149 10.9658 15.4853 9.94818C14.8151 8.93116 13.9813 7.89829 12.9912 6.90814C12.0004 5.91739 10.9668 5.08249 9.94919 4.41205ZM9.96872 8.38568C10.8425 8.38568 11.5507 9.09486 11.5507 9.96869C11.5505 10.8423 10.8424 11.5507 9.96872 11.5507C9.09512 11.5506 8.38692 10.8423 8.38669 9.96869C8.38669 9.09491 9.09497 8.38576 9.96872 8.38568ZM6.72653 2.81341C4.71997 2.16621 3.5301 2.4731 3.00192 3.00091C2.4739 3.52894 2.16607 4.71944 2.81344 6.7265C2.99831 7.29953 3.25284 7.90255 3.57321 8.5224C4.11897 7.759 4.74263 6.99957 5.4404 6.26458L5.84762 5.84759C6.7111 4.98412 7.61273 4.22285 8.52145 3.57318C7.90187 3.25299 7.29933 2.9982 6.72653 2.81341ZM16.8974 3.00189C16.3694 2.47387 15.1789 2.16505 13.1718 2.81244C12.5987 2.99733 11.9959 3.25274 11.3759 3.57318C12.2849 4.22302 13.188 4.98383 14.0517 5.84759L14.458 6.26458C15.1557 6.99951 15.7794 7.75907 16.3252 8.5224C16.6456 7.90244 16.901 7.29963 17.0859 6.7265C17.7331 4.71994 17.4252 3.53008 16.8974 3.00189Z"
                                fill={isActiveURL("tags/science") ? "#ffffff" : "#6F7275"} />
                        </svg>
                        Наука
                    </Link>
                    <Link href={route('tags.show', 'music')} className={`flex items-center gap-3 w-full px-4 py-2 text-start text-[14px] font-medium rounded-xl leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer ${isActiveURL("tags/music") ? "bg-night text-white hover:bg-[#363e4f] focus:bg-[#363e4f]" : "text-[#6F7275] hover:bg-[#F0EDFF] focus:bg-[#F0EDFF] "}`}>
                        <svg width="18" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.71875 3.67487L16.8026 1.24117C17.4217 1.11647 18 1.58989 18 2.22148V6.34974V15.5887C18 15.9414 17.8157 16.271 17.5048 16.4376C16.1885 17.1426 14.7703 17.5862 13.4111 17.4092C12.5523 17.2974 11.7582 16.7825 11.3614 16.0127C11.0766 15.4602 11.0657 14.9363 11.2855 14.2799C11.4683 13.7339 11.7986 13.2419 12.246 12.8794C13.7853 11.6321 16.0898 11.2822 18 11.6995V6.79556L7.64782 8.86396C7.18031 8.95737 6.84375 9.36783 6.84375 9.84458V17.9409C4.61043 19.4259 2.59375 19.2783 1 17.9409"
                                stroke={isActiveURL("tags/music") ? "#ffffff" : "#6F7275"} stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                        Музыка
                    </Link>
                    <Link href={route('tags.show', 'activism')} className={`flex items-center gap-3 w-full px-4 py-2 text-start text-[14px] font-medium rounded-xl leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer ${isActiveURL("tags/activism") ? "bg-night text-white hover:bg-[#363e4f] focus:bg-[#363e4f]" : "text-[#6F7275] hover:bg-[#F0EDFF] focus:bg-[#F0EDFF]"}`}>
                        <svg width="18" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 8.25C12.7902 8.25 14.5076 8.96069 15.7734 10.2266C17.0393 11.4924 17.75 13.2098 17.75 15C17.75 15.7119 17.4279 16.2532 16.9316 16.6367C16.419 17.0329 15.7264 17.25 15.0723 17.25H6.92773C6.27356 17.25 5.58105 17.0329 5.06836 16.6367C4.57214 16.2532 4.25 15.7119 4.25 15C4.25 13.2098 4.96069 11.4924 6.22656 10.2266C7.41326 9.03986 8.99677 8.34063 10.665 8.25781L11 8.25ZM2.5625 4.125C3.48467 4.125 4.25 5.03564 4.25 6.1875C4.25 7.33936 3.48467 8.25 2.5625 8.25C1.64033 8.25 0.875 7.33936 0.875 6.1875C0.875 5.03564 1.64033 4.125 2.5625 4.125ZM19.4375 4.125C20.3597 4.125 21.125 5.03564 21.125 6.1875C21.125 7.33936 20.3597 8.25 19.4375 8.25C18.5153 8.25 17.75 7.33936 17.75 6.1875C17.75 5.03564 18.5153 4.125 19.4375 4.125ZM7.8125 0.75C8.73467 0.75 9.5 1.66064 9.5 2.8125C9.5 3.96436 8.73467 4.875 7.8125 4.875C6.89033 4.875 6.125 3.96436 6.125 2.8125C6.125 1.66064 6.89033 0.75 7.8125 0.75ZM14.1875 0.75C15.1097 0.75 15.875 1.66064 15.875 2.8125C15.875 3.96436 15.1097 4.875 14.1875 4.875C13.2653 4.875 12.5 3.96436 12.5 2.8125C12.5 1.66064 13.2653 0.75 14.1875 0.75Z"
                                stroke={isActiveURL("tags/activism") ? "#ffffff" : "#6F7275"} stroke-width="1.5" />
                        </svg>
                        Активизм
                    </Link>
                    <Link href={route('tags.show', 'videogames')} className={`flex items-center gap-3 w-full px-4 py-2 text-start text-[14px] rounded-xl font-medium leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer ${isActiveURL("tags/videogames") ? "bg-night text-white hover:bg-[#363e4f] focus:bg-[#363e4f]" : "text-[#6F7275] hover:bg-[#F0EDFF] focus:bg-[#F0EDFF]"}`}>
                        <svg width="18" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.12626 0.825602C9.80429 0.588505 12.085 0.58694 14.8118 0.850016C17.1167 1.07257 19.181 2.56805 19.9163 4.82365L20.0862 5.36662C20.8861 8.05133 20.9961 10.3472 20.6897 13.099C20.4646 15.1204 18.1913 16.047 16.5599 14.9916L12.7649 12.5356C11.7577 11.8842 10.4797 11.8432 9.43876 12.4135L9.23466 12.5356L5.21317 15.1371C3.72402 16.1003 1.62 15.4206 1.20927 13.6117L1.17509 13.434C0.709536 10.5091 0.944586 8.13401 1.67802 5.35978C2.34386 2.84134 4.55605 1.05328 7.12626 0.825602ZM14.6673 2.3422C12.0356 2.08832 9.84769 2.09046 7.25809 2.31974C5.29257 2.49395 3.62626 3.85973 3.12821 5.74357C2.43724 8.35732 2.23003 10.518 2.65653 13.1977L2.6868 13.3324C2.88329 13.9857 3.70343 14.3279 4.39872 13.8783L8.41923 11.2768L8.71903 11.0981C10.2405 10.2647 12.1083 10.3243 13.5804 11.2768L17.3743 13.7319C18.1465 14.2315 19.1067 13.7568 19.1985 12.933C19.4863 10.348 19.3822 8.25518 18.6458 5.78752L18.4905 5.28849C17.9574 3.65295 16.4362 2.51287 14.6673 2.3422ZM6.50028 5.25041C6.9144 5.25052 7.25028 5.58626 7.25028 6.00041V6.75041H8.00028C8.4144 6.75052 8.75028 7.08626 8.75028 7.50041C8.7501 7.91439 8.41428 8.25029 8.00028 8.25041H7.25028V9.00041C7.2501 9.41439 6.91428 9.75029 6.50028 9.75041C6.08618 9.75041 5.75046 9.41447 5.75028 9.00041V8.25041H5.00028C4.58618 8.25041 4.25046 7.91447 4.25028 7.50041C4.25028 7.08619 4.58607 6.75041 5.00028 6.75041H5.75028V6.00041C5.75028 5.58619 6.08607 5.25041 6.50028 5.25041ZM14.0003 7.00041C14.5525 7.00052 15.0003 7.44819 15.0003 8.00041C15.0001 8.55247 14.5524 9.00029 14.0003 9.00041C13.4481 9.00041 13.0005 8.55254 13.0003 8.00041C13.0003 7.44812 13.448 7.00041 14.0003 7.00041ZM16.0003 5.00041C16.5525 5.00052 17.0003 5.44819 17.0003 6.00041C17.0001 6.55247 16.5524 7.00029 16.0003 7.00041C15.4481 7.00041 15.0005 6.55254 15.0003 6.00041C15.0003 5.44812 15.448 5.00041 16.0003 5.00041Z"
                                fill={isActiveURL("tags/videogames") ? "#ffffff" : "#6F7275"} />
                        </svg>
                        Видеоигры
                    </Link>
                    <Link href={route('tags.show', 'movie')} className={`flex items-center gap-3 w-full px-4 py-2 text-start text-[14px] font-medium rounded-xl leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer ${isActiveURL("tags/movie") ? "bg-night text-white hover:bg-[#363e4f] focus:bg-[#363e4f]" : "text-[#6F7275] hover:bg-[#F0EDFF] focus:bg-[#F0EDFF]"}`}>
                        <svg width="18" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0C15.5228 0 20 4.47715 20 10C20 13.4257 18.2766 16.4479 15.6504 18.25H20L20.0771 18.2539C20.4551 18.2925 20.75 18.6118 20.75 19C20.75 19.3882 20.4551 19.7075 20.0771 19.7461L20 19.75H12.2188C11.5049 19.9118 10.7628 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 14.6944 5.30558 18.5 10 18.5C10.5662 18.5 11.1191 18.4425 11.6543 18.3369C11.758 18.2827 11.8749 18.25 12 18.25H12.0479C15.7528 17.3334 18.5 13.9882 18.5 10C18.5 5.30558 14.6944 1.5 10 1.5ZM10 11C11.6569 11 13 12.3431 13 14C13 15.6569 11.6569 17 10 17C8.34315 17 7 15.6569 7 14C7 12.3431 8.34315 11 10 11ZM10 12.5C9.17157 12.5 8.5 13.1716 8.5 14C8.5 14.8284 9.17157 15.5 10 15.5C10.8284 15.5 11.5 14.8284 11.5 14C11.5 13.1716 10.8284 12.5 10 12.5ZM10 3C11.6569 3 13 4.34315 13 6C13 7.65685 11.6569 9 10 9C8.34315 9 7 7.65685 7 6C7 4.34315 8.34315 3 10 3ZM10 4.5C9.17157 4.5 8.5 5.17157 8.5 6C8.5 6.82843 9.17157 7.5 10 7.5C10.8284 7.5 11.5 6.82843 11.5 6C11.5 5.17157 10.8284 4.5 10 4.5Z"
                                fill={isActiveURL("tags/movie") ? "#ffffff" : "#6F7275"} />
                        </svg>
                        Кино и анимация
                    </Link>
                    <Link href={route('tags.show', 'literature')} className={`flex items-center gap-3 w-full px-4 py-2 text-start text-[14px] font-medium rounded-xl leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer ${isActiveURL("tags/literature") ? "bg-night text-white hover:bg-[#363e4f] focus:bg-[#363e4f]" : "text-[#6F7275] hover:bg-[#F0EDFF] focus:bg-[#F0EDFF]"}`}>
                        <svg width="18" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.49994 1.5H16.8742C17.5732 1.5 18.2336 1.85964 18.5542 2.4807C19.6071 4.51989 19.6445 5.9828 18.5561 8.04406C18.235 8.65214 17.5827 9 16.8951 9H3.86302C3.31225 9 2.77996 9.22432 2.41873 9.64008C0.367393 12.0011 0.170155 13.5564 2.4334 15.9353C2.78698 16.307 3.28602 16.5 3.799 16.5H18.9999"
                                stroke={isActiveURL("tags/literature") ? "#ffffff" : "#6F7275"} stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                        Литература
                    </Link>
                    <Link href={route('tags.show', 'technologies')} className={`flex items-center gap-3 w-full px-4 py-2 text-start text-[14px] font-medium rounded-xl leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer ${isActiveURL("tags/technologies") ? "bg-night text-white hover:bg-[#363e4f] focus:bg-[#363e4f]" : "text-[#6F7275] hover:bg-[#F0EDFF] focus:bg-[#F0EDFF]"}`}>
                        <svg width="18" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0.75C8.41421 0.75 8.75 1.08579 8.75 1.5V3.75H16C16.4142 3.75 16.75 4.08579 16.75 4.5C16.75 4.91421 16.4142 5.25 16 5.25H4.75V17.25H16.75V13.25H20.5C20.9142 13.25 21.25 13.5858 21.25 14C21.25 14.4142 20.9142 14.75 20.5 14.75H18.25V18.75H14.75V21C14.75 21.4142 14.4142 21.75 14 21.75C13.5858 21.75 13.25 21.4142 13.25 21V18.75H8.75V21C8.75 21.4142 8.41421 21.75 8 21.75C7.58579 21.75 7.25 21.4142 7.25 21V18.75H3.25V14.75H1C0.585786 14.75 0.25 14.4142 0.25 14C0.25 13.5858 0.585786 13.25 1 13.25H3.25V8.75H1C0.585786 8.75 0.25 8.41421 0.25 8C0.25 7.58579 0.585786 7.25 1 7.25H3.25V3.75H7.25V1.5C7.25 1.08579 7.58579 0.75 8 0.75Z"
                                fill={isActiveURL("tags/technologies") ? "#ffffff" : "#6F7275"} />
                        </svg>
                        Технологии
                    </Link>
                    <Link href={route('tags.show', 'cosplay')} className={`flex items-center gap-3 w-full px-4 py-2 text-start text-[14px] font-medium rounded-xl leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer ${isActiveURL("tags/cosplay") ? "bg-night text-white hover:bg-[#363e4f] focus:bg-[#363e4f]" : "text-[#6F7275] hover:bg-[#F0EDFF] focus:bg-[#F0EDFF]"}`}>
                        <svg width="18" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.6113 0.912109C13.6078 0.9114 16.4836 2.31052 19.9492 4.89941L20.25 5.125V17.1738C20.2497 18.2687 19.2711 19.0616 18.2363 18.9141L18.0293 18.8721C15.1468 18.1069 12.8155 17.7207 10.5029 17.7119C8.48051 17.7043 6.44415 17.985 4.04004 18.5811L2.98633 18.8564C1.87681 19.159 0.750355 18.3361 0.75 17.1602V5.11523L1.06348 4.89062L1.7334 4.41992C5.0421 2.13976 7.80761 0.912864 10.6113 0.912109ZM10.6123 2.41211C8.17938 2.41269 5.63565 3.50977 2.25 5.88965V17.1602C2.25037 17.3212 2.4114 17.4583 2.5918 17.4092L3.68066 17.125C6.17108 16.5076 8.33277 16.2037 10.5078 16.2119C12.9925 16.2213 15.4589 16.6384 18.4141 17.4229L18.4795 17.4316C18.6283 17.4351 18.7497 17.3145 18.75 17.1738V5.87988C15.51 3.50292 13.0395 2.41163 10.6123 2.41211ZM7.5 8C8.32843 8 9 8.67157 9 9.5C9 10.3284 8.32843 11 7.5 11C6.67157 11 6 10.3284 6 9.5C6 8.67157 6.67157 8 7.5 8ZM13.5 8C14.3284 8 15 8.67157 15 9.5C15 10.3284 14.3284 11 13.5 11C12.6716 11 12 10.3284 12 9.5C12 8.67157 12.6716 8 13.5 8Z"
                                fill={isActiveURL("tags/cosplay") ? "#ffffff" : "#6F7275"} />
                        </svg>
                        Косплей
                    </Link>
                    <Link href={route('tags.show', 'business')} className={`flex items-center gap-3 w-full px-4 py-2 text-start text-[14px] font-medium rounded-xl leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer ${isActiveURL("tags/business") ? "bg-night text-white hover:bg-[#363e4f] focus:bg-[#363e4f]" : "text-[#6F7275] hover:bg-[#F0EDFF] focus:bg-[#F0EDFF]"}`}>
                        <svg width="18" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.29761 0.307129L7.41089 0.325684L8.02905 0.455566C8.8185 0.610736 10.0876 0.82325 11.5378 0.92627C13.4855 1.06459 15.6867 0.999472 17.4861 0.387207L17.6003 0.355957C18.1705 0.237369 18.7494 0.661882 18.7498 1.28857V9.39111C18.7497 9.67465 18.6223 9.94085 18.408 10.1196L18.3113 10.1909C17.4132 10.7647 16.6396 11.1438 15.7966 11.3833C15.2301 11.5442 14.6491 11.6356 14.0027 11.6909C14.1174 12.1432 14.1794 12.5694 14.1794 13.0005C14.1794 13.6296 14.051 14.224 13.8367 14.8755L13.739 15.1577C13.6513 15.4046 13.4673 15.5999 13.2371 15.7046L13.1355 15.7437C10.9989 16.4322 9.24004 16.8313 7.40405 16.8491C5.79652 16.8646 4.1685 16.5878 2.21069 16.0073L1.35034 15.7397C1.13601 15.6701 0.950522 15.5246 0.831787 15.3296L0.784912 15.2427C0.37029 14.3668 0.119015 13.5957 0.112061 12.7847C0.105233 11.9717 0.34369 11.201 0.750732 10.3276L0.834717 10.1821C1.02505 9.91139 1.34273 9.76389 1.66479 9.78174L1.82495 9.80518L3.16382 10.1069C6.14537 10.7546 8.20298 10.9832 10.8025 10.2759L10.8777 10.2593C11.2524 10.1971 11.6212 10.428 11.7234 10.8022C11.8321 11.2019 11.5957 11.6144 11.196 11.7231L10.574 11.8784C7.63311 12.5446 5.21897 12.117 1.93335 11.3667C1.70181 11.935 1.60868 12.3671 1.61206 12.772C1.61595 13.2226 1.74014 13.7094 2.04077 14.3833C4.19384 15.0664 5.82702 15.3642 7.3894 15.3491C8.93818 15.3341 10.4642 15.0111 12.4099 14.3979C12.5935 13.8379 12.6794 13.4143 12.6794 13.0005C12.6794 12.5261 12.5713 12.0064 12.2957 11.2593L11.9373 10.2876L12.9724 10.2505C13.9906 10.2133 14.7195 10.1294 15.3865 9.93994C15.9776 9.77199 16.5506 9.51109 17.2498 9.08447V6.85889C15.664 7.32757 14.3385 7.55569 12.9939 7.54443C11.7062 7.53362 10.4365 7.3046 8.94507 6.90283L8.29175 6.72021L8.21948 6.69482C7.86683 6.55302 7.67138 6.16457 7.77905 5.7915C7.8868 5.41881 8.25888 5.19365 8.63257 5.26123L8.70776 5.27881L9.33667 5.45459C10.7611 5.83813 11.8932 6.0351 13.0066 6.04443C14.2681 6.05499 15.5515 5.8237 17.2498 5.29053V2.021C15.3426 2.52197 13.224 2.54967 11.4314 2.42236C9.91218 2.31444 8.58479 2.09302 7.74976 1.9292V3.29932C7.74976 3.82454 7.32366 4.2495 6.79956 4.24951H0.999756C0.585722 4.2493 0.249756 3.9136 0.249756 3.49951C0.249959 3.0856 0.585847 2.74972 0.999756 2.74951H6.24976V1.25537C6.25025 0.692604 6.73792 0.248312 7.29761 0.307129Z"
                                fill={isActiveURL("tags/business") ? "#ffffff" : "#6F7275"} />
                        </svg>
                        Бизнес
                    </Link>
                </div>
            </div>
            <div className="w-full px-3 pb-3">
                <Link href='#' className={`flex items-center gap-3 w-full px-4 pt-2 text-start text-[12px] text-gray-500 font-medium rounded-md leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer hover:underline`}>
                    Политика конфиденциальности
                </Link>
                <Link href='#' className={`flex items-center gap-3 w-full px-4 text-start text-[12px] text-gray-500 font-medium rounded-md leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer hover:underline`}>
                    Пользовательское соглашение
                </Link>
                <Link href='#' className={`flex items-center gap-3 w-full px-4 text-start text-[12px] text-gray-500 font-medium rounded-md leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer hover:underline`}>
                    Сотрудничество
                </Link>
                <p className={`flex items-center gap-3 w-full px-4 pt-4 text-start text-[12px] text-gray-500 font-medium rounded-md leading-5 transition duration-150 ease-in-out`}>© Брильц Анна, 2025</p>
            </div>
        </div>
    )
}