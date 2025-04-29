import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import ModalReport from '@/Components/ModalReport';
import ModalPost from '@/Components/ModalPost';
import DeletePostButton from '@/Components/DeletePostButton';
import { Post } from '@/Components/Post';

export default function UserProfile() {
    const { user, posts } = usePage().props;

    const [activePost, setActivePost] = useState(null);
    const [modalType, setModalType] = useState(null);

    const Archive = (e, postId) => {
        e.preventDefault();
        router.post(route('posts.updateArchive', { post: postId }), {
            preserveScroll: true,
            onSuccess: () => console.log('Post archived successfully'),
        });
    }

    const handlePostClick = (post, type) => {
        setActivePost(post);
        setModalType(type);
    };


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title={`Профиль ${user.username}`} />
                <div className="flex h-[calc(100vh-100px)] bg-gray-50">
                    <div className="w-80 flex-shrink-0 p-6 sticky top-0 border-r">
                    <div className="flex flex-col items-center justify-center mt-3">
                        {user?.path_img && (
                            <img
                                src={`/images/${user.path_img}`}
                                alt="user pfp"
                                className="w-[100px] mb-1"
                            />
                        )}
                        <div className="flex flex-col items-center mb-2">
                            <span className="text-[22px] font-semibold select-none">{user.username}</span>
                            <span className="text-[18px] mt-[-4px] select-none">@{user.login}</span>
                        </div>
                        <div className="mt-2">
  {user?.tags?.length > 0 ? (
    <div className="flex items-center justify-center flex-wrap gap-2">
      {user.tags.map((tag) => (
        <span 
          key={tag.id} 
          className="px-3 py-1 bg-[#EEEDFF] text-flower text-sm font-medium rounded-full"
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
                    <div className="flex flex-wrap  gap-3 p-6 overflow-y-auto">
                        {posts.filter(post => !post.archived).map((item) => (
                            <Post key={item} post={item}/>
                        ))}
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
                </div>
        </AuthenticatedLayout>
    );
}