import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface HeadlessListProps {
  initialValue: string;
}

const people = [{ name: "Pending" }, { name: "Publish" }, { name: "Rejected" }];

export default function HeadlessList({ initialValue }: HeadlessListProps) {
  const [selected, setSelected] = useState({ name: initialValue });

  return (
    <Listbox value={selected}>
      <div className="relative mt-1">
        <Listbox.Button
          className={`relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left ${
            selected.name == "Pending" && "bg-[#FFF9ED] text-[#9C742B]"
          } ${
            selected.name == "Publish" &&
            "bg-[var(--primary-light)] text-primary"
          } ${selected.name == "Rejected" && "bg-[#EBFBF2] text-[#22804A]"}`}
        >
          <span className="block truncate">{selected.name}</span>
        </Listbox.Button>
      </div>
    </Listbox>
  );
}
