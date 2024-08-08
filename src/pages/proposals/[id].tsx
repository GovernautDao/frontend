import { useRouter } from 'next/router';
import { grantsTestData } from '../../../data/grantsTestData';

export default function ViewProposal() {
  const router = useRouter();

  // TODO: get this from DB or potentially a context provider so we dont have to look up same info twice, we should already have all
  // if not most info from the index page
  const data = grantsTestData.find(
    (grant) => grant.id === parseInt(router.query.id as string)
  );

  return (
    <div>
      <h1>Proposal: {data?.id}</h1>
      <p>Description: {data?.description}</p>
      <p>This is the proposal content</p>
    </div>
  );
}
