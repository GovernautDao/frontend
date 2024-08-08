import { Grant } from '@/interfaces/Grant';

export const grantsTestData: Grant[] = [
  {
    id: 1,
    title: 'Proposal Title 1',
    submittedBy: 'JohnDoe.eth',
    expiryDate: '2024-08-06T00:00:00.000Z',
    description: 'Small Test Description',
  },
  {
    id: 2,
    title: 'Proposal Title 2',
    submittedBy: '0xDd58c2964bACd6133B214c6F2EEdbbB995947460',
    expiryDate: '2024-09-07T00:00:00.000Z',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 3,
    title: 'Proposal Title 3',
    submittedBy: 'North Star',
    expiryDate: '2024-08-07T00:00:00.000Z',
    description: 'Small Test Description',
  },
];
