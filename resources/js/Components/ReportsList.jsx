export const ReportsList = ({ reports, format }) => {
    return (
        <>
            {format === 'cards' ? (
                <div className="flex items-start flex-wrap gap-3 ">
                    {reports.map((item) => (
                        <div key={item.id} className="flex flex-col p-4 border w-[360px] bg-white rounded-md ">
                            <div className="flex items-center gap-3">
                                <div className="w-full">
                                    <div className="bg-[#EEEDFF] p-2 pl-4 w-full rounded-md mb-4">
                                        <p className="text-[14px] font-medium text-flower">{item.post.title}</p>
                                        <p className="text-[14px] font-normal text-flower">{item.post.preview}</p>
                                    </div>
                                    <div className="">
                                        <p className="text-[18px] mt-[-4px] font-semibold">{item.user.username}</p>
                                        <p className="text-[15px] mt-[-4px] text-[#57595C] opacity-60">@{item.user.login}</p>
                                    </div>
                                    {item.message ? (<p>{item.message}</p>) : (<p className="italic font-light text-gray-400">Пользователь не оставил сообщения</p>)}
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Пост (заголовок)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Пользователь (логин)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сообщение</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {reports.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm font-medium text-gray-900">{item.post.title}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm text-gray-500">{item.user.login}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.message ? (<p className="text-sm text-gray-500">{item.message}</p>) : (<p className="italic text-sm font-light text-gray-400">Пользователь не оставил сообщения</p>)}
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