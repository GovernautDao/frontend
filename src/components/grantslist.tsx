import Link from 'next/link';

const grantslist = [ //example data
  {
    id: 1,
    title: 'Proposal Title 1',
    submittedBy: 'John Doe',
    date: 'August 6, 2024'
  },
  {
    id: 2,
    title: 'Proposal Title 2',
    submittedBy: 'Jane Smith',
    date: 'August 5, 2024'
  },
  {
    id: 3,
    title: 'Proposal Title 3',
    submittedBy: 'Alice Johnson',
    date: 'August 4, 2024'
  }
]

export default function GrantsList() {
  return (
    <ul className="space-y-4">
      {grantslist.map((grant, index) => (
        <li key={index} className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{grant.title}</h2>
            <p className="text-gray-600">Submitted by: <span className="font-medium">{grant.submittedBy}</span></p>
            <p className="text-gray-600">Date: <span className="font-medium">{grant.date}</span></p>
          </div>
          <Link href={`/proposals/view?id=${grant.id}`} >
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg">View Details</button>
          </Link>
        </li>
      ))}
    </ul>
  )
}