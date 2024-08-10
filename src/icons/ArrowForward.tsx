import { SVGProps } from 'react';

export default function ArrowForward(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z'
        fill='#1D1B20'
      />
    </svg>
  );
}
