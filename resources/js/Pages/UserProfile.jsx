import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import ModalPost from '@/Components/ModalPost';
import { Post } from '@/Components/Post';
import { PostHorizontal } from '@/Components/PostHorizontal';
import { FollowButton } from '@/Components/FollowButton';
import image from '../../../public/images/thematicjpg.jpg';

export default function UserProfile() {
    const { user, posts } = usePage().props;
    const [displayFormat, setDisplayFormat] = useState('table');
    const [activePost, setActivePost] = useState(null);
    const [modalType, setModalType] = useState(null);

    const { auth, user: profileUser } = usePage().props;
    const currentUser = auth.user;
    const isOwner = currentUser && profileUser && currentUser.id === profileUser.id;

    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = posts.filter(post =>
        !post.archived && (
            !searchQuery ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.preview && post.preview.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    );

    return (
        <AuthenticatedLayout>
            <Head title={`Профиль ${user.username}`} />
            <div className="max-w-7xlmy-6 px-4 flex flex-col gap-3">
                <div className="w-full bg-gray-50 rounded-xl shadow-[1px_1px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.3)]">
                    <div className='w-full rounded-t-md p-[80px] '
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                    </div>
                    <div className="flex items-end gap-5 pb-8 mt-[-30px] sm:px-6 lg:px-8">
                        {profileUser?.path_img && (
                            <img
                                src={`/images/${profileUser.path_img}`}
                                alt="user pfp"
                                className="w-[100px] mb-1 rounded-full border-4 border-gray-50"
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
                            {currentUser ? (
                                isOwner ? (
                                    <span></span>
                                ) : (
                                    <FollowButton userId={profileUser.id} initialFollowing={currentUser.is_following} />
                                )
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-3">
                    {/* Блок постов */}
                    <div className="w-full lg:w-[60rem]">
                        <div className="py-4 bg-gray-50 rounded-xl shadow-[1px_1px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.3)] sm:px-6 lg:px-5 flex justify-between">
                            <div className='w-[50%] flex px-4 items-center bg-gray-100 rounded-lg transition duration-300 ease-in-out'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3189 14.4331C19.5659 12.8255 20.1536 10.8031 19.9624 8.77757C19.7713 6.75199 18.8156 4.87533 17.2899 3.52936C15.7641 2.18339 13.783 1.46922 11.7494 1.53215C9.71575 1.59508 7.78251 2.43037 6.34292 3.8681C4.90207 5.30683 4.06405 7.24082 3.99962 9.27597C3.93518 11.3111 4.6492 13.2942 5.99615 14.8212C7.3431 16.3482 9.22162 17.3041 11.2489 17.4942C13.2762 17.6842 15.2996 17.0941 16.9069 15.8441L16.9499 15.8891L21.1919 20.1321C21.2848 20.225 21.3951 20.2987 21.5165 20.349C21.6379 20.3993 21.768 20.4252 21.8994 20.4252C22.0308 20.4252 22.1609 20.3993 22.2823 20.349C22.4037 20.2987 22.514 20.225 22.6069 20.1321C22.6998 20.0392 22.7735 19.9289 22.8238 19.8075C22.8741 19.6861 22.9 19.556 22.9 19.4246C22.9 19.2932 22.8741 19.1631 22.8238 19.0417C22.7735 18.9203 22.6998 18.81 22.6069 18.7171L18.3639 14.4751L18.3189 14.4331ZM16.2429 5.2831C16.8075 5.83858 17.2566 6.50035 17.5641 7.23024C17.8717 7.96013 18.0317 8.74369 18.0349 9.53572C18.0381 10.3278 17.8845 11.1126 17.5829 11.845C17.2813 12.5773 16.8377 13.2427 16.2776 13.8028C15.7176 14.3629 15.0521 14.8065 14.3198 15.1081C13.5874 15.4097 12.8026 15.5633 12.0105 15.5601C11.2185 15.5569 10.4349 15.3969 9.70505 15.0893C8.97517 14.7817 8.3134 14.3327 7.75792 13.7681C6.64784 12.6398 6.02857 11.1185 6.03502 9.53572C6.04146 7.9529 6.67309 6.43675 7.79233 5.31751C8.91156 4.19828 10.4277 3.56665 12.0105 3.5602C13.5934 3.55376 15.1146 4.17302 16.2429 5.2831Z" fill="#C4C4C4" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Поиск"
                                    className="w-full h-full border-none focus:ring-0 text-[14px] bg-gray-100"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="relative inline-flex items-center bg-gray-100 rounded-full p-1 shadow-[inset_0px_1px_1px_rgba(163,177,198,0.4),inset_0px_-2px_4px_rgba(255,255,255,0.8)]">
                                <button
                                    onClick={() => setDisplayFormat('cards')}
                                    className={`relative z-10 px-3 py-2 rounded-full transition-colors duration-200 ${displayFormat === 'cards' ? 'text-night' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    title="Карточки"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M10.5 11.5H7C6.71667 11.5 6.47933 11.404 6.288 11.212C6.09667 11.02 6.00067 10.7827 6 10.5V7C6 6.71667 6.096 6.47933 6.288 6.288C6.48 6.09667 6.71733 6.00067 7 6H10.5C10.7833 6 11.021 6.096 11.213 6.288C11.405 6.48 11.5007 6.71733 11.5 7V10.5C11.5 10.7833 11.404 11.021 11.212 11.213C11.02 11.405 10.7827 11.5007 10.5 11.5ZM10.5 18H7C6.71667 18 6.47933 17.904 6.288 17.712C6.09667 17.52 6.00067 17.2827 6 17V13.5C6 13.2167 6.096 12.9793 6.288 12.788C6.48 12.5967 6.71733 12.5007 7 12.5H10.5C10.7833 12.5 11.021 12.596 11.213 12.788C11.405 12.98 11.5007 13.2173 11.5 13.5V17C11.5 17.2833 11.404 17.521 11.212 17.713C11.02 17.905 10.7827 18.0007 10.5 18ZM17 11.5H13.5C13.2167 11.5 12.9793 11.404 12.788 11.212C12.5967 11.02 12.5007 10.7827 12.5 10.5V7C12.5 6.71667 12.596 6.47933 12.788 6.288C12.98 6.09667 13.2173 6.00067 13.5 6H17C17.2833 6 17.521 6.096 17.713 6.288C17.905 6.48 18.0007 6.71733 18 7V10.5C18 10.7833 17.904 11.021 17.712 11.213C17.52 11.405 17.2827 11.5007 17 11.5ZM17 18H13.5C13.2167 18 12.9793 17.904 12.788 17.712C12.5967 17.52 12.5007 17.2827 12.5 17V13.5C12.5 13.2167 12.596 12.9793 12.788 12.788C12.98 12.5967 13.2173 12.5007 13.5 12.5H17C17.2833 12.5 17.521 12.596 17.713 12.788C17.905 12.98 18.0007 13.2173 18 13.5V17C18 17.2833 17.904 17.521 17.712 17.713C17.52 17.905 17.2827 18.0007 17 18ZM5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.8043 20.021 20.413 20.413C20.0217 20.805 19.5507 21.0007 19 21H5ZM5 19H19V5H5V19Z"
                                            fill={displayFormat === 'cards' ? "#303236" : "#C4C4C4"}
                                        />
                                    </svg>
                                </button>

                                <div
                                    className={`absolute top-1 bottom-1 left-1 bg-white rounded-full shadow-sm transition-all duration-200 ${displayFormat === 'cards' ? 'translate-x-0 w-[49px]' : 'translate-x-[48px] w-[48px]'
                                        }`}
                                />

                                <button
                                    onClick={() => setDisplayFormat('table')}
                                    className={`relative z-10 px-3 py-2 rounded-full transition-colors duration-200 ${displayFormat === 'table' ? 'text-night' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    title="Таблица"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M4 21C3.71667 21 3.47933 20.904 3.288 20.712C3.09667 20.52 3.00067 20.2827 3 20V17.35C3 17.0667 3.096 16.8293 3.288 16.638C3.48 16.4467 3.71733 16.3507 4 16.35H20C20.2833 16.35 20.521 16.446 20.713 16.638C20.905 16.83 21.0007 17.0673 21 17.35V20C21 20.2833 20.904 20.521 20.712 20.713C20.52 20.905 20.2827 21.0007 20 21H4ZM4 14.35C3.71667 14.35 3.47933 14.254 3.288 14.062C3.09667 13.87 3.00067 13.6327 3 13.35V10.625C3 10.3417 3.096 10.1043 3.288 9.913C3.48 9.72167 3.71733 9.62567 4 9.625H20C20.2833 9.625 20.521 9.721 20.713 9.913C20.905 10.105 21.0007 10.3423 21 10.625V13.35C21 13.6333 20.904 13.871 20.712 14.063C20.52 14.255 20.2827 14.3507 20 14.35H4ZM4 7.625C3.71667 7.625 3.47933 7.529 3.288 7.337C3.09667 7.145 3.00067 6.908 3 6.626V4C3 3.71667 3.096 3.47933 3.288 3.288C3.48 3.09667 3.71733 3.00067 4 3H20C20.2833 3 20.521 3.096 20.713 3.288C20.905 3.48 21.0007 3.71733 21 4V6.625C21 6.90833 20.904 7.146 20.712 7.338C20.52 7.53 20.2827 7.62567 20 7.625H4Z"
                                            fill={displayFormat === 'table' ? "#303236" : "#C4C4C4"}
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="mt-3">
                            {displayFormat === 'cards' ? (
                                <div className="flex flex-wrap gap-1">
                                    {filteredPosts.length > 0 ? (
                                        filteredPosts.map((item) => (
                                            <Post post={item} key={item.id} />
                                        ))
                                    ) : (
                                        <div className="w-full text-center text-[14px] select-none opacity-40 py-10 text-[#6F7275] font-medium">
                                            {searchQuery ? "По вашему запросу ничего не найдено" : "Нет доступных постов"}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {filteredPosts.length > 0 ? (
                                        filteredPosts.map((item) => (
                                            <PostHorizontal post={item} key={item.id} />
                                        ))
                                    ) : (
                                        <div className="w-full text-center text-[14px] select-none opacity-40 py-10 text-[#6F7275] font-medium">
                                            {searchQuery ? "По вашему запросу ничего не найдено" : "Нет доступных постов"}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Блок тегов */}
                    <div className="w-full lg:w-1/3 max-w-xs">
                        {profileUser.description && (
                            <div className="flex flex-col py-5 bg-gray-50 rounded-xl shadow-[1px_1px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.3)] mb-3 sm:px-6 lg:px-8">
                                <p className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Описание профиля</p>
                                <p>{profileUser.description}</p>
                            </div>
                        )
                        }
                        <div className="flex flex-col py-5 bg-gray-50 rounded-xl shadow-[1px_1px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.3)] sm:px-6 lg:px-8">
                            <p className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Теги пользователя</p>
                            {profileUser?.tags?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {profileUser.tags.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="px-4 py-1 bg-[#ede6ff] opacity-80 text-[#715BC8] text-[15px] font-semibold rounded-lg"
                                        >
                                            {tag.title}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">Пользователь не указал теги</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Модальные окна */}
            {activePost && modalType === 'info' && (
                <ModalPost
                    post={activePost}
                    onClose={() => setActivePost(null)}
                />
            )}
            {activePost && modalType === 'report' && (
                <ModalReport
                    post_id={activePost.id}
                    onClose={() => setActivePost(null)}
                />
            )}
        </AuthenticatedLayout>
    );
}