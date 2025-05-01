export const PostsList = ({ posts, format }) => {
    return (
        <>
            {format === 'cards' ? (
                <div className="flex flex-wrap items-start gap-3 ">
                    {posts.map((item) => (
                        <div className="flex flex-col border-b w-[360px] bg-white rounded-md shadow-md hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                        >
                            {item?.path_img && (
                                <div className='relative w-full '>
                                    <img
                                        src={`/images/${item.path_img}`}
                                        alt="Work image"
                                        className='rounded-t-md'
                                    />
                                </div>

                            )}
                            <div className='p-4'>
                                <div className='flex justify-between'>
                                    <a href={route('users.posts', { login: item.user.login })}>
                                        <div className='flex items-center gap-1' onClick={(e) => { e.stopPropagation(); }}>
                                            {item.user?.path_img && (
                                                <img
                                                    src={`/images/${item.user.path_img}`}
                                                    alt="user pfp"
                                                    className="w-[25px] mb-1"
                                                />
                                            )}
                                            <div>
                                                <p className='text-[15px] font-medium'>{item.user.username}</p>
                                                <p className='text-[14px] mt-[-4px]'>@{item.user.login}</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div

                                >
                                    <div>
                                        <div >
                                            <p className='text-[22px] font-semibold'>{item.title}</p>

                                        </div>
                                        <p className='text-[14px] font-sm text-muted-foreground'>{item.preview}</p>

                                    </div>

                                    <div className='flex flex-col items-start'>
                                        {item?.tags?.length > 0 ? (
                                            <div className="flex items-start mt-12 flex-wrap gap-2 mb-2">
                                                {item.tags.map((tag) => (
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
                                        <p className='text-[14px]'>Уже откликнулось: {item.reports_count || 0}</p>
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