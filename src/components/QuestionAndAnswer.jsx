import { useEffect, useRef } from "react";
import Answer from "./Answers";

export default function QuestionAndAnswer({ data }) {
  const scrollToAns = useRef(null);

  useEffect(() => {
    scrollToAns.current?.scrollTo({
      top: scrollToAns.current.scrollHeight,
      behavior: "smooth",
    });
  }, [data]);

  return (
    <div
      ref={scrollToAns}
      className="h-full w-full overflow-y-auto px-2 sm:px-4 md:px-6"
    >
      <ul className="space-y-4 text-zinc-300">
        {data?.map((item, index) => {
          return item.type === "q" ? (
            <li key={index} className="flex justify-end">
              <div className="max-w-[85%] sm:max-w-[75%] md:max-w-[65%] rounded-2xl rounded-br-md bg-zinc-700 border border-zinc-600 px-3 py-2 text-sm sm:text-base shadow-md break-words">
                <Answer ans={item.text} total={data.length} index={index} />
              </div>
            </li>
          ) : (
            item.text.map((ans, i) => (
              <li
                key={`${index}-${i}`}
                className="flex justify-start text-left"
              >
                <div className="max-w-[95%] sm:max-w-[90%] md:max-w-[80%] px-2 py-2 text-sm sm:text-base break-words">
                  <Answer ans={ans} total={item.text.length} index={i} />
                </div>
              </li>
            ))
          );
        })}
      </ul>
    </div>
  );
}