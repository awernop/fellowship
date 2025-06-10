

export const UsersList = ({users, format}) => {
    return(
        <>
        {format === 'cards' ? (
            <div className="flex items-start flex-wrap gap-3 ">
            {users.map((item) => (
               <div key={item.id} className="flex flex-col p-4 border w-[360px] bg-white rounded-md ">
                <div className="flex items-center gap-3">
                <img
                                    src={`/images/${item.path_img}`}
                                    alt="user pfp"
                                    className="w-[50px] mb-1"
                                />
                <div>
                    <p className="text-[18px] font-medium">{item.username}</p>
                    <p className="text-[14px] mt-[-4px] text-[#57595C] font-medium opacity-60">@{item.login}</p>
                    <p>{item.email}</p>
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
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Аватар</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Имя пользователя</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Логин</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {users.map((item) => (
        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4 whitespace-nowrap">
            <img
              src={`/images/${item.path_img}`}
              alt="user pfp"
              className="w-10 h-10 rounded-full object-cover"
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <p className="text-sm font-medium text-gray-900">{item.username}</p>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <p className="text-sm text-gray-500">@{item.login}</p>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <p className="text-sm text-gray-500">{item.email}</p>
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