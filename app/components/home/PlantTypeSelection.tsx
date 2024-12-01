import { plantsData } from "@/data/plants";
import Image from "next/image";
import { ChangeEventHandler } from "react";

type PlantTypeSelectionProps = {
  id: string
  onChange?: ChangeEventHandler<HTMLInputElement>,
}

export default function PlantTypeSelection({id, onChange}: PlantTypeSelectionProps) {
  const inputName = id;

  return (
    <div>
      <ul className="flex flex-row gap-2 w-full py-4 overflow-x-auto md:overflow-hidden md:hover:overflow-x-auto">
        {plantsData.map((e) => (
          <li
            key={e.key}
            className={`basis-1/4 min-w-[93px] ${!e.enable && "opacity-45"}`}
          >
            <input
              type="radio"
              id={e.key}
              value={e.key}
              name={inputName}
              className="hidden peer"
              disabled={!e.enable}
              onChange={onChange}
              required
            />
            <label
              htmlFor={e.key}
              className="relative flex flex-col items-center gap-2 p-5 text-gray-500 bg-white border border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-neutral-700 dark:peer-checked:text-green-500 peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-neutral-800 dark:hover:bg-neutral-900"
            >
              <Image
                src={`/plants/${e.icon}`}
                alt={e.name}
                width={48}
                height={48}
                className="object-contain"
              />
              <span className="font-medium text-sm">{e.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}