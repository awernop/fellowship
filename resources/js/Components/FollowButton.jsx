import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export const FollowButton = ({ userId, initialFollowing }) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing || false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFollow = () => {
    setIsLoading(true);
    
    router.post(
      isFollowing ? `/users/${userId}/unsubscribe` : `/users/${userId}/subscribe`,
      {},
      {
        preserveScroll: true,
        onSuccess: () => setIsFollowing(!isFollowing),
        onFinish: () => setIsLoading(false),
        // Важно для кеширования
        only: ['user'], // Укажите здесь ключи, которые нужно обновить
      }
    );
  };
  
  return (
    <button 
      onClick={handleFollow}
      disabled={isLoading}
      className={`inline-flex justify-center items-center w-[20%] py-2 border border-transparent rounded-md font-semibold text-[14px] transition ease-in-out duration-350 ${
        isFollowing 
          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
          : 'bg-night text-white hover:bg-[#37393F]'
      }`}
    >
      {isLoading ? 'Загрузка...' : isFollowing ? 'Отписаться' : 'Подписаться'}
    </button>
  );
};