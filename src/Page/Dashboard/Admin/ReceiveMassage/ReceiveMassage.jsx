import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineTextsms } from "react-icons/md";
import SectionHeader from "../../../../component/SectionHeader/SectionHeader";
import useGetReceiveMassage from "../../../../hooks/useGetReceiveMassage";

const ReceiveMassage = () => {
  const { receiveMassage, isLoading } = useGetReceiveMassage();

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMessageView = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="mxw mx-auto md:p-4 ">
      <div className="md:my-10 my-5">
        <SectionHeader title={"Contact Us Messages"} />
      </div>
      {isLoading ? (
        <div className="grid  gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={`loading-${idx}`}
              className="bg-white dark:bg-gray-700 shadow-md rounded-lg md:p-3 p-1 border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-[1.03]"
            >
              <p className="font-bold flex w-48 mb-2 h-8 skeleton items-center gap-2 md:text-2xl text-xl text-gray-700"></p>
              <p className="w-full h-5 skeleton mb-2 font-semibold flex items-center gap-2 md:text-xl text-lg text-gray-700"></p>
              <p className="w-full h-20 skeleton gap-2 md:text-lg text-md text-gray-700">
                <span></span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <>
          {receiveMassage.length > 0 ? (
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {receiveMassage.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md rounded-lg md:p-3 p-1 border border-gray-200 transition-transform transform hover:scale-[1.03]"
                >
                  <p className="font-bold flex items-center gap-2 md:text-2xl text-xl dark:text-gray-200 text-gray-700">
                    <FaUser /> {msg.name}
                  </p>
                  <p className="font-semibold flex items-center gap-2 dark:text-gray-300 md:text-xl text-lg text-gray-700">
                    <MdOutlineTextsms /> {msg.email}
                  </p>
                  <p className="gap-2 md:text-lg text-md dark:text-gray-400 text-gray-700">
                    <span>
                      {isExpanded
                        ? msg.message
                        : `${msg.message.slice(0, 100)}... `}
                    </span>
                    {/* "Read More" Button */}
                    {msg.message.length > 100 && (
                      <button
                        onClick={() => toggleMessageView()}
                        className="text-blue-500 hover:underline ml-2"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No messages found.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ReceiveMassage;
