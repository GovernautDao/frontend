import GrantsList from "@/components/grantslist";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="w-screen px-14 py-4">
      <div className="flex justify-between flex-col gap-10 mb-7">
        <h1 className="text-5xl font-bold">Grants</h1>
        <div className="flex justify-between">
          <input
            type="text"
            value={search}
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="py-2 border border-gray-300 mt-1 w-3/12 rounded-3xl px-4"
          />
          <Link href="/proposals/create">
            <button className="text-black font-bold py-2 px-4 rounded-3xl border-black border hover:bg-gray-300">
              Create Proposal
            </button>
          </Link>
        </div>
      </div>
      <GrantsList filter={search ?? ""} />
    </div>
  );
}
