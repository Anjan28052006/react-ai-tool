export default function RecentHistory({
  recentHistory,
  setSelectedHistory,
  qSet,
}) {
  const clear = () => {
    localStorage.removeItem("history");
    recentHistory([]);
  };

  const clearSelectedHistory = (selectedItem) => {
    let history = JSON.parse(localStorage.getItem("history")) || [];

    history = history.filter((item) => item !== selectedItem);

    localStorage.setItem("history", JSON.stringify(history));
    recentHistory(history);
  };

  return (
    <div className="h-full overflow-y-auto">
      <h1 className="sticky top-0 z-10 bg-zinc-900 text-white text-sm sm:text-xl flex justify-center items-center gap-2 py-3 px-2">
        <span className="truncate">Recent History</span>

        <button
          onClick={clear}
          type="button"
          className="p-1 rounded-md cursor-pointer hover:bg-zinc-700"
        >
          🗑️
        </button>
      </h1>

      <ul className="text-left text-sm">
        {qSet?.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between px-2 py-2 border-b border-zinc-800"
          >
            <li
              onClick={() => setSelectedHistory(item)}
              className="flex-1 px-2 py-1 truncate cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md text-xs sm:text-sm"
            >
              {item}
            </li>

            <button
              onClick={() => clearSelectedHistory(item)}
              type="button"
              className="p-1 rounded-md hover:bg-zinc-700 flex-shrink-0 cursor-pointer"
            >
              🗑️
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}