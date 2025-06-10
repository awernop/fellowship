export const PostsList = ({ posts, format }) => {
    return (
        <>
            {format === 'cards' ? (
                <div className="flex flex-wrap items-start gap-3 ">
                    {posts.map((post) => (
                        <div className="flex flex-col h-[590px] border w-[30%] bg-white rounded-xl shadow-sm transition-all duration-300 cursor-pointer m-1"
                                >
                                    <div className='p-3 pt-4 h-full flex flex-col justify-between'>
                                        <div>
                                            <div className='flex justify-between mb-3 px-2'>
                                            <a href={route('users.posts', { login: post.user.login })}>
                                                <div className='flex items-center gap-2' onClick={(e) => { e.stopPropagation(); }}>
                                                    {post.user?.path_img && (
                                                        <div>
                                                            <img
                                                                src={`/images/${post.user.path_img}`}
                                                                alt="user pfp"
                                                                className="w-[35px] rounded-md object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className='text-[15px] font-semibold text-[#57595C]'>{post.user.username}</p>
                                                        <p className='text-[14px] mt-[-4px] text-[#57595C] font-medium opacity-60'>@{post.user.login}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div onClick={(e) => openPost(e, post.id)}
                        
                                        >
                                            {post?.path_img && (
                                                <div className='relative w-full ' onClick={() => {
                                                    handlePostClick(post, 'info');
                                                    setIsModalPostOpen(true)
                                                }}>
                                                    <img
                                                        src={`/images/${post.path_img}`}
                                                        alt="Work image"
                                                        className='rounded-xl'
                                                    />
                                                </div>
                        
                                            )}
                                            <div className='mt-3'>
                                                <div >
                                                    <p className='text-[24px] font-bold text-night pl-2'>{post.title}</p>
                        
                                                </div>
                                                <p className="text-[14px] font-normal text-muted-foreground pl-3 line-clamp-3">{post.preview}</p>
                        
                                            </div>
                        
                                            
                                        </div>
                                        </div>
                                        <div className='flex flex-col items-start p-2'>
                                                {post?.tags?.length > 0 ? (
                                                    <div className="flex items-start flex-wrap gap-2 mb-2">
                                                        {post.tags.map((tag) => (
                                                            <span
                                                                key={tag.id}
                                                                className="px-3 py-1 bg-[#8F79E4] opacity-80 text-white text-[13px] font-medium rounded-full"
                                                            >
                                                                #{tag.title}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500 text-[12px]">Пользователь не указал теги</p>
                                                )}
                                                <div className='flex w-full justify-between'>
                                                    <p className='text-[13px] text-gray-400 font-regular'>Уже откликнулось: {post.reports_count || 0}</p>
                                                    <p className='text-[13px] text-gray-400 font-regular'>{post.created_at_format}</p>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                    ))}
                </div>
            )
                :
                (
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-full bg-white rounded-md overflow-hidden">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Пользователь</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Заголовок</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Превью</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Содержание</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {posts.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm font-medium text-gray-900">{item.user.login}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm text-gray-500">{item.preview}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </>
    )
}