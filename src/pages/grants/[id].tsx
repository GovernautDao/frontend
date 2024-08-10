import { useRouter } from "next/router";
import { grantsTestData } from "../../../data/grantsTestData";

export default function ViewProposal() {
  const router = useRouter();

  // if not most info from the index page
  const data = grantsTestData.find(
    (grant) => grant.id === parseInt(router.query.id as string)
  );

  return (
    <div className="m-10 bg-white border rounded-3xl p-10 shadow-sm border-1 border-gray-400">
      <div className="mb-4">
        <label htmlFor="title" className="block text-black font-bold">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={data?.title}
          className="w-full p-2 border border-gray-300 rounded-lg mt-1"
          disabled
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-black font-bold">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={data?.description}
          className="w-full p-2 border border-gray-300 rounded-lg mt-1"
          rows={4}
          disabled
        />
      </div>
      <div className="mb-4">
        <label htmlFor="submittedBy" className="block text-black font-bold">
          Submitted by
        </label>
        <input
          type="text"
          id="submittedBy"
          name="submittedBy"
          value={data?.submittedBy}
          className="w-full p-2 border border-gray-300 rounded-lg mt-1"
          disabled
        />
      </div>
      <div className="mb-4">
        <label htmlFor="expiryDate" className="block text-black font-bold">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiryDate"
          name="expiryDate"
          value={data?.expiryDate ? new Date(data?.expiryDate).toString() : ""}
          className="w-full p-2 border border-gray-300 rounded-lg mt-1"
          disabled
        />
      </div>
    </div>
  );
}
