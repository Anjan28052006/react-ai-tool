import { useEffect, useRef } from "react";
import Answer from "./Answers";

export default function QuestionAndAnswer({ data }) {
  const scrollToAns = useRef();

  useEffect(() => {
    scrollToAns.current?.scrollTo({
      top: scrollToAns.current.scrollHeight,
      behavior: "smooth",
    });
  }, [data]);
  return (
    <>
      <div ref={scrollToAns} className="container h-120 overflow-auto">
        <div className="text-zinc-300">
          {/* {data} */}
          <ul>
            {data &&
              data.map((item, index) => {
                return item.type === "q" ? (
                  <li className="flex justify-end mb-4" key={index}>
                    <div className="text-right border-2 border-zinc-600 bg-zinc-700 rounded-bl-2xl rounded-tl-2xl rounded-br-2xl w-fit p-2  shadow-md">
                      <Answer
                        ans={item.text}
                        total={data.length}
                        index={index}
                      />
                    </div>
                  </li>
                ) : (
                  item.text.map((ans, i) => (
                    <li className="text-left p-1" key={`${index}-${i}`}>
                      <Answer ans={ans} total={item.text.length} index={i} />
                    </li>
                  ))
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
