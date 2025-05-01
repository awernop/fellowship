

export const UsersList = ({users}) => {
    return(
        <div className="flex items-start gap-3">
        {users.map((item) => (
           <div key={item.id} className="flex flex-col p-4 border-b w-[360px] bg-white rounded-md">
            <div className="flex items-center gap-3">
            <img
                                src={`/images/${item.path_img}`}
                                alt="user pfp"
                                className="w-[50px] mb-1"
                            />
            <div>
                <p className="text-[18px] font-medium">{item.username}</p>
                <p className="text-[14px] mt-[-4px]">@{item.login}</p>
                <p>{item.email}</p>
            </div>
            </div>
           </div>                 
        ))}
    </div>
    )
}