import { useState } from "react";
import ReactMarkdown from "react-markdown";

type AccordionType = {
  autoOpen: boolean;
  title: string;
  body: string;
};

export default function Accordion({
  autoOpen = false,
  title,
  body,
}: AccordionType) {
  const [open, setOpen] = useState<boolean>(autoOpen);

  return (
    <div>
      <h2 onClick={() => setOpen(!open)}>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 ${open? 'rounded-t-xl': 'rounded-xl'} focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`}
        >
          <span>{title}</span>
          <svg
            className="w-3 h-3 rotate-180 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div className={open ? "" : "hidden"}>
        <div className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            <ReactMarkdown className="markdown-body">{body}</ReactMarkdown>
          </p>
        </div>
      </div>
    </div>
  );
}
