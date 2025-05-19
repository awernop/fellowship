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
      className={`px-4 py-2 rounded-md ${
        isFollowing 
          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isLoading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};