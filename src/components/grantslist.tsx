import { Grant } from '@/interfaces/Grant';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { grantsTestData } from '../../data/grantsTestData';
import { differenceInDays } from 'date-fns';

interface GrantsListProps {
  titleSearch: string;
}

export default function GrantsList({ titleSearch }: GrantsListProps) {
  const [grantsList, setGrantsList] = useState<Grant[]>(grantsTestData);
  const [filteredGrantsList, setFilteredGrantsList] =
    useState<Grant[]>(grantsTestData);

  useEffect(() => {
    formatAndFilterGrants(titleSearch, grantsList);
  }, [titleSearch, grantsList]);

  const getDayDifferenceFromCurrentTime = (expiryDate: string) => {
    return differenceInDays(new Date(expiryDate), new Date());
  };

  const getExpiresInDateText = (expiryDate: string) => {
    const expiredDays = getDayDifferenceFromCurrentTime(expiryDate);

    return expiredDays > 0
      ? `Expires in ${expiredDays} day${expiredDays > 1 ? 's' : ''}`
      : `Expired ${Math.abs(expiredDays)} day${
          Math.abs(expiredDays) > 1 ? 's' : ''
        } ago`;
  };

  const formatAndFilterGrants = (titleSearch: string, grantsList: Grant[]) => {
    let finalList: Grant[] = [];

    if (titleSearch.length > 0) {
      finalList = grantsList.filter((grant) => {
        return grant.title.toLowerCase().includes(titleSearch.toLowerCase());
      });
    } else {
      finalList = grantsList;
    }

    const finalListWithExpiry = finalList.map((grant) => {
      return {
        ...grant,
        expiryDate: getExpiresInDateText(grant.expiryDate),
      };
    });

    setFilteredGrantsList(finalListWithExpiry);
  };

  return (
    <ul className='flex flex-col gap-4'>
      {filteredGrantsList.map((grant, index) => {
        const isOpen = getDayDifferenceFromCurrentTime(grant.expiryDate) > 0;

        return (
          <Link key={index} href={`/proposals/${encodeURIComponent(grant.id)}`}>
            <li className='shadow-sm rounded-3xl px-4 py-2 border hover:shadow-lg hover:border-2 hover:border-black hover:cursor-pointer'>
              <div className='flex flex-col gap-1'>
                <div className='flex justify-between items-center'>
                  <p className='font-medium text-gray-500'>
                    {grant.expiryDate}
                  </p>
                  <p
                    className={`border rounded-3xl py-1 px-2 text-sm ${
                      isOpen ? 'border-green-800' : 'border-red-800'
                    } font-bold flex items-center justify-center gap-2`}
                  >
                    <span
                      className={`p-1.5 rounded-full block ${
                        isOpen ? 'bg-green-700' : 'bg-red-700'
                      }`}
                    ></span>
                    {isOpen ? 'Open' : 'Closed'}
                  </p>
                </div>
                <h2 className='text-xl font-bold truncate'>{grant.title}</h2>
                <p className='text-sm text-gray-600'>{grant.description}</p>
                <p className='text-black font-bold text-right truncate'>
                  {grant.submittedBy}
                </p>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
