import { useSearchParams } from 'next/navigation'

export default function ViewProposal() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  return (
    <div>
      <h1>Proposal: {id}</h1>
      <p>This is the proposal content</p>
    </div>
  )
}