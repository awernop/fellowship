export const PostsList = ({posts}) => {
    return(
        <div className="flex items-start gap-3">
        {posts.map((item) => (
           <div key={item.id} className="flex flex-col p-4 border-b w-[360px] bg-white rounded-md">
            <p>{item.title}</p>
           </div>                 
        ))}
    </div>
    )
}