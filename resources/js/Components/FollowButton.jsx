import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export const FollowButton = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    router.get(`/users/${userId}/check-subscription`, {}, {
      onSuccess: (data) => setIsFollowing(data.props.isFollowing)
    });
  }, [userId]);
  
  const handleFollow = () => {
    setIsLoading(true);
    
    const url = isFollowing 
      ? `/users/${userId}/unsubscribe` 
      : `/users/${userId}/subscribe`;
    
    router.post(url, {}, {
      preserveScroll: true,
      onSuccess: () => setIsFollowing(!isFollowing),
      onFinish: () => setIsLoading(false)
    });
  };
  
  return (
    <button 
      onClick={handleFollow}
      disabled={isLoading}
      className={`px-12 py-[10px] rounded-full transition duration-150 ease-in-out font-semibold text-[14px] ${
        isFollowing 
          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
          : 'bg-night text-white hover:bg-[#37393F]'
      }`}
    >
      {isLoading ? 'Загрузка...' : isFollowing ? 'Отписаться' : 'Подписаться'}
    </button>
  );
};