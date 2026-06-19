export default function RecentHistory({
  recentHistory,
  setSelectedHistory,
  qSet,
}) {
  const clear = () => {
    localStorage.clear();
    recentHistory([]);
  };

  const clearSelectedHistory=(SelectedItem)=>{
    let history=JSON.parse(localStorage.getItem('history'));
    history=history.filter((item)=>{
        if(item!=SelectedItem){
            return item;
        }
    })
       recentHistory(history);
       localStorage.setItem('history',JSON.stringify(history));
    //   console.log(SelectedItem);
  }
  return (
    <>
    
        <h1 className="text-white text-xl flex justify-center ">
          <span>Recent History</span>
          <button onClick={clear} type="button" className="cursor-pointer  hover:bg-zinc-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#75FBFD"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
          </button>
        </h1>
        <ul className="text-left text-sm overflow-auto">
          {qSet &&
            qSet.map((item, index) => {
              return (
                <div key={index} className="flex justify-between pr-2 py-1">
                <li
                  onClick={() => setSelectedHistory(item)}
                  className="p-1 pl-5 w-full truncate cursor-pointer hover:bg-zinc-700 hover:text-zinc-200 text-zinc-400"
                >
                  {item}
                </li>
                 <button onClick={()=>clearSelectedHistory(item)} type="button" className="cursor-pointer hover:bg-zinc-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#75FBFD"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
          </button>
          </div>
              );
            })}
        </ul>
      
    </>
  );
}
